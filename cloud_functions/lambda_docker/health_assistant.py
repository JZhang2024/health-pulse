import json
import os
import time
import uuid
from typing import TypedDict, Optional, List, Dict
import boto3
from openai import OpenAI
from boto3.dynamodb.conditions import Key

# Type definitions
class VitalMetric(TypedDict):
    average: float
    confidence: float
    unit: str
    note: str
    timeSeries: List[Dict[str, float]]

class VitalsData(TypedDict):
    heartRate: VitalMetric
    respiratoryRate: VitalMetric

class Message(TypedDict):
    role: str
    content: str

# Initialize clients
dynamodb = boto3.resource('dynamodb')
print("Initialized DynamoDB resource: %s" % dynamodb)
conversations_table = dynamodb.Table(os.environ['CONVERSATIONS_TABLE'])
print("Initialized DynamoDB table")
XAI_API_KEY = os.getenv("XAI_API_KEY")
client = OpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)
print("Initialized OpenAI client")

# System prompt template
SYSTEM_PROMPT = """You are a health information assistant integrated into a vital signs monitoring application. 
You have access to the user's heart rate and respiratory rate measurements.

Important guidelines:
1. Always maintain a professional and empathetic tone
2. Provide general health information only
3. Include clear disclaimers when discussing medical topics
4. Reference the user's vital signs data when relevant
5. Encourage users to seek professional medical advice for specific health concerns
6. Use the confidence scores to qualify your interpretations
7. Alert users to concerning vital sign readings while maintaining a calm tone
8. Focus on education and general wellness advice

Never provide:
- Specific medical diagnoses
- Treatment recommendations
- Medication advice
- Emergency medical guidance

Current vital signs data:
Heart Rate: {heart_rate:.1f} {heart_rate_unit} (Confidence: {heart_rate_confidence:.0%})
Respiratory Rate: {respiratory_rate:.1f} {respiratory_rate_unit} (Confidence: {respiratory_rate_confidence:.0%})

Remember to always include appropriate medical disclaimers in your responses."""

def get_vital_signs_context(vitals_data: Optional[VitalsData]) -> str:
    """Generate context about vital signs for the AI model."""
    if not vitals_data:
        print("No vital signs data available.")
        return "No vital signs data available."
    
    hr = vitals_data['heartRate']
    rr = vitals_data['respiratoryRate']
    
    return SYSTEM_PROMPT.format(
        heart_rate=hr['average'],
        heart_rate_unit=hr['unit'],
        heart_rate_confidence=hr['confidence'],
        respiratory_rate=rr['average'],
        respiratory_rate_unit=rr['unit'],
        respiratory_rate_confidence=rr['confidence']
    )

def get_conversation_history(conversation_id: str) -> List[Message]:
    """Retrieve conversation history from DynamoDB."""
    try:
        response = conversations_table.query(
            KeyConditionExpression=Key('conversation_id').eq(conversation_id),
            ScanIndexForward=True  # Sort messages by timestamp
        )
        
        if not response['Items']:
            return []
            
        # Convert DynamoDB items to Message objects
        messages = []
        for item in response['Items']:
            messages.append({
                'role': item['role'],
                'content': item['content']
            })
        
        print(f"Retrieved {len(messages)} messages from conversation history")
            
        return messages
        
    except Exception as e:
        print(f"Error retrieving conversation history: {str(e)}")
        return []

def save_messages(conversation_id: str, new_messages: List[Message]):
    """Save new messages to DynamoDB."""
    timestamp = int(time.time() * 1000)  # Use millisecond precision
    
    try:
        # Batch write new messages
        with conversations_table.batch_writer() as batch:
            for message in new_messages:
                batch.put_item(Item={
                    'conversation_id': conversation_id,
                    'timestamp': timestamp,
                    'role': message['role'],
                    'content': message['content'],
                    'ttl': int(time.time()) + (7 * 24 * 60 * 60)  # 7 day TTL
                })
                timestamp += 1  # Ensure unique timestamps for ordering
                
    except Exception as e:
        print(f"Error saving messages: {str(e)}")
        raise

def generate_response(conversation_id: str, new_messages: List[Message], vitals_data: Optional[VitalsData] = None) -> str:
    """Generate a response using the OpenAI API with conversation history."""
    try:
        # Get existing conversation history
        history = get_conversation_history(conversation_id)
        
        # Prepare conversation with system prompt and history
        conversation = [
            {"role": "system", "content": get_vital_signs_context(vitals_data)}
        ]
        
        # Add historical context (last 10 messages to stay within token limits)
        conversation.extend(history[-10:])
        
        # Add new messages
        conversation.extend(new_messages)
        
        # Get response from OpenAI
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=conversation,
            temperature=0.7,
            max_tokens=500,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )
        
        assistant_response = response.choices[0].message.content
        
        # Save new messages and response to history
        save_messages(conversation_id, [
            *new_messages,
            {"role": "assistant", "content": assistant_response}
        ])
        
        return assistant_response
        
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return "I apologize, but I'm having trouble processing your request. Please try again later."

def lambda_handler(event, context):
    """AWS Lambda handler for the health assistant API."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
    }
    
    # Handle preflight requests
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Parse request body
        body = json.loads(event['body'])
        messages = body.get('messages', [])
        vitals_data = body.get('vitalsData')
        conversation_id = body.get('conversationId')
        
        # Generate new conversation ID if not provided
        if not conversation_id:
            conversation_id = str(uuid.uuid4())
        
        # Generate response
        response = generate_response(conversation_id, messages, vitals_data)
        print("Generated response")
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'response': response,
                'conversationId': conversation_id
            })
        }
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Internal server error'
            })
        }