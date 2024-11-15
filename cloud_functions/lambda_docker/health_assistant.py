import json
import os
from typing import TypedDict, Optional, List, Dict
import boto3
from openai import OpenAI

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

# Initialize OpenAI client
XAI_API_KEY = os.getenv("XAI_API_KEY")
client = OpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)

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
    
    context = SYSTEM_PROMPT.format(
        heart_rate=hr['average'],
        heart_rate_unit=hr['unit'],
        heart_rate_confidence=hr['confidence'],
        respiratory_rate=rr['average'],
        respiratory_rate_unit=rr['unit'],
        respiratory_rate_confidence=rr['confidence']
    )
    
    print("Generated vital signs context:", context)
    return context

def generate_response(messages: List[Message], vitals_data: Optional[VitalsData] = None) -> str:
    """Generate a response using the OpenAI API."""
    try:
        # Prepare conversation history with system prompt
        conversation = [
            {"role": "system", "content": get_vital_signs_context(vitals_data)}
        ]
        
        # Add user messages
        conversation.extend(messages)
        
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
        print("Received response from OpenAI")
        
        return response.choices[0].message.content
        
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
        
        # Generate response
        response = generate_response(messages, vitals_data)
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'response': response
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