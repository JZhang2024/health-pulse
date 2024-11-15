import json
import uuid
import os
import boto3
from botocore.config import Config

def lambda_handler(event, context):
    try:
        print("Received event: %s" % json.dumps(event))
        
        # Parse request body
        body = json.loads(event['body'])
        file_type = body.get('fileType', 'video/mp4')
        print("Parsed body: %s" % body)
        
        # Generate unique video ID
        video_id = str(uuid.uuid4())
        print("Generated video ID: %s" % video_id)
        
        # Initialize S3 client with appropriate config
        s3_client = boto3.client('s3', config=Config(
            signature_version='s3v4',
            region_name=os.environ['AWS_REGION']
        ))
        print("Initialized S3 client")
        
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
        print("Generated presigned URL: %s" % url)
        
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
        print("Error occurred: %s" % str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Internal server error'
            })
        }