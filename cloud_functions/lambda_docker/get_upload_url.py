import os
import json
import uuid
import boto3
from botocore.config import Config

def lambda_handler(event, context):
    try:
        # Parse request body
        body = json.loads(event['body'])
        file_type = body.get('fileType', 'video/mp4')
        
        # Generate unique video ID
        video_id = str(uuid.uuid4())
        
        # Initialize S3 client with appropriate config
        s3_client = boto3.client('s3', config=Config(
            signature_version='s3v4',
            region_name=os.environ['AWS_REGION']
        ))
        
        # Generate presigned URL
        url = s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': os.environ['UPLOAD_BUCKET'],
                'Key': f'uploads/{video_id}.mp4',
                'ContentType': file_type
            },
            ExpiresIn=300  # URL expires in 5 minutes
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({
                'uploadUrl': url,
                'videoId': video_id
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }