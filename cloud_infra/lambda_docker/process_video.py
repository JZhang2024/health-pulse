import os
import json
import boto3
import tempfile
from vitallens import VitalLens, Method

print("Imported libraries")

# Initialize VitalLens client
vital_lens = VitalLens(
    method=Method.VITALLENS,
    api_key=os.environ['VITALLENS_API_KEY'],
    detect_faces=True,
    fdet_max_faces=1,
    estimate_running_vitals=False,
    export_to_json=False
)
print("Initialized VitalLens client")

def get_video_info(filepath):
    import subprocess
    cmd = ['ffprobe', '-v', 'error', '-select_streams', 'v:0',
           '-show_entries', 'stream=duration,r_frame_rate,nb_frames',
           '-of', 'json', filepath]
    result = subprocess.run(cmd, capture_output=True, text=True)
    info = json.loads(result.stdout)
    print(f"Full FFprobe output: {info}")
    
    # Parse frame rate which comes as 'numerator/denominator'
    stream_info = info.get('streams', [{}])[0]
    frame_rate = stream_info.get('r_frame_rate', '').split('/')
    if len(frame_rate) == 2:
        actual_fps = float(frame_rate[0]) / float(frame_rate[1])
    else:
        actual_fps = 0
        
    duration = float(stream_info.get('duration', 0))
    nb_frames = int(stream_info.get('nb_frames', 0))
    
    expected_frames = int(duration * actual_fps)
    
    print(f"Video duration: {duration} seconds")
    print(f"Actual frame rate: {actual_fps} fps")
    print(f"Number of frames reported: {nb_frames}")
    print(f"Expected number of frames (duration * fps): {expected_frames}")
    
    return {
        'duration': duration,
        'fps': actual_fps,
        'nb_frames': nb_frames,
        'expected_frames': expected_frames
    }

def process_vitallens_results(results, fps):
    # Validate input
    if not results or not isinstance(results, list) or len(results) == 0:
        raise ValueError("No face data found in results")

    # Get the first face's vital signs
    face_data = results[0]
    vital_signs = face_data.get('vital_signs', {})
    print("Extracted vital signs: %s" % vital_signs)
    
    # Extract raw data
    heart_rate = vital_signs.get('heart_rate', {})
    ppg_waveform = vital_signs.get('ppg_waveform', {})
    respiratory = vital_signs.get('respiratory_rate', {})
    respiratory_waveform = vital_signs.get('respiratory_waveform', {})
    print("Extracted heart rate: %s" % heart_rate)
    print("Extracted PPG waveform: %s" % ppg_waveform)
    print("Extracted respiratory rate: %s" % respiratory)
    print("Extracted respiratory waveform: %s" % respiratory_waveform)
    
    print(f"Using FPS: {fps}")
    
    # Process heart rate time series
    heart_rate_value = heart_rate.get('value', 0)
    print("Heart rate value: %d" % heart_rate_value)
    heart_rate_timeseries = [
        {
            "time": index / fps,
            # Scale waveform around actual heart rate
            "value": heart_rate_value + (value * 5),
            "confidence": ppg_waveform.get('confidence', [])[index] if index < len(ppg_waveform.get('confidence', [])) else 0
        }
        for index, value in enumerate(ppg_waveform.get('data', []))
    ]
    print("Processed heart rate time series: %s" % heart_rate_timeseries)
    
    # Process respiratory rate time series
    respiratory_rate_value = respiratory.get('value', 0)
    print("Respiratory rate value: %d" % respiratory_rate_value)
    respiratory_timeseries = [
        {
            "time": index / fps,
            # Scale waveform around actual respiratory rate
            "value": respiratory_rate_value + (value * 2),
            "confidence": respiratory_waveform.get('confidence', [])[index] if index < len(respiratory_waveform.get('confidence', [])) else 0
        }
        for index, value in enumerate(respiratory_waveform.get('data', []))
    ]
    print("Processed respiratory rate time series: %s" % respiratory_timeseries)
    
    # Format the response
    response = {
        "heartRate": {
            "timeSeries": heart_rate_timeseries,
            "average": heart_rate_value,
            "confidence": heart_rate.get('confidence', 0),
            "unit": heart_rate.get('unit', 'bpm'),
            "note": heart_rate.get('note', "Analysis complete")
        },
        "respiratoryRate": {
            "timeSeries": respiratory_timeseries,
            "average": respiratory_rate_value,
            "confidence": respiratory.get('confidence', 0),
            "unit": respiratory.get('unit', 'breaths/min'),
            "note": respiratory.get('note', "Analysis complete")
        }
    }
    print("Formatted response: %s" % response)

    return response
    

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
    }

    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Parse request body
        body = json.loads(event['body'])
        video_id = body['videoId']
        
        s3_client = boto3.client('s3')
        bucket = os.environ['UPLOAD_BUCKET']
        key = f'uploads/{video_id}.mp4'
        temp_video_path = f'/tmp/{video_id}.mp4'
        
        # Download video from S3
        s3_client.download_file(bucket, key, temp_video_path)
        
        # Get and log video information
        print("Analyzing video file...")
        video_info = get_video_info(temp_video_path)
        
        # Process with VitalLens
        print(f"Starting VitalLens processing")
        results = vital_lens(temp_video_path, fps=video_info['fps'])
        
        processed_results = process_vitallens_results(results, fps=video_info['fps'])
        
        # Cleanup
        os.remove(temp_video_path)
        s3_client.delete_object(Bucket=bucket, Key=key)
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                **processed_results,
                'videoInfo': video_info  # Include video info in response
            })
        }
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }