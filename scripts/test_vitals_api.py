from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from vitallens import VitalLens, Method
import uvicorn
import numpy as np
import cv2
from typing import Optional, Dict, Any
import os
from dotenv import load_dotenv
import logging
import json
import tempfile
from pathlib import Path
import asyncio
from datetime import datetime
import shutil
from contextlib import asynccontextmanager


# Create a temporary directory for logs and processing files
TEMP_DIR = tempfile.mkdtemp(prefix='vitallens_')

# Configure detailed logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
    ]
)
logger = logging.getLogger(__name__)

def cleanup_temp_files():
    """Clean up temporary directory and its contents on shutdown"""
    try:
        if os.path.exists(TEMP_DIR):
            logger.info(f"Cleaning up temporary directory: {TEMP_DIR}")
            shutil.rmtree(TEMP_DIR)
    except Exception as e:
        logger.error(f"Error cleaning up temporary directory: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load environment variables and initialize VitalLens
    loaded = load_dotenv()
    logger.info(f"Environment variables loaded: {loaded}")

    api_key = os.getenv("VITALLENS_API_KEY")
    if not api_key:
        raise ValueError("VITALLENS_API_KEY not found in environment variables")

    try:
        app.state.vital_lens = VitalLens(
            method=Method.VITALLENS,
            api_key=api_key,
            detect_faces=True,
            estimate_running_vitals=False
        )
        logger.info("VitalLens client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize VitalLens client: {str(e)}")
        raise

    yield

    # Shutdown: Clean up resources
    logger.info("Shutting down VitalsLens API server...")
    cleanup_temp_files()


# Load environment variables
loaded = load_dotenv()
logger.info(f"Environment variables loaded: {loaded}")

# Validate API key
api_key = os.getenv("VITALLENS_API_KEY")
if not api_key:
    raise ValueError("VITALLENS_API_KEY not found in environment variables")

app = FastAPI(title="VitalsLens API", version="1.0.0", lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize VitalLens client
try:
    vital_lens = VitalLens(
        method=Method.VITALLENS,
        api_key=api_key,
        detect_faces=True,
        estimate_running_vitals=False,
        export_to_json=False
    )
    logger.info("VitalLens client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize VitalLens client: {str(e)}")
    raise

def get_video_format(content_type: str) -> str:
    """
    Determine video format from content type, handling various codec specifications.
    Returns 'mp4' or 'webm', or raises ValueError for unsupported formats.
    """
    content_type = content_type.lower()
    if content_type.startswith('video/mp4') or 'avc1' in content_type:
        return 'mp4'
    elif content_type.startswith('video/webm'):
        return 'webm'
    else:
        raise ValueError(f"Unsupported video format: {content_type}")


def process_vitallens_results(results: list) -> Dict[str, Any]:
    """
    Process and format VitalLens results into a standardized response format.
    Scales waveform data around actual vital sign values to create more realistic visualizations.
    
    Args:
        results: List of face dictionaries containing vital signs measurements
        
    Returns:
        Dictionary containing processed heart rate and respiratory rate data with time series
    """
    try:
        # Validate input
        if not results or not isinstance(results, list) or len(results) == 0:
            raise ValueError("No face data found in results")

        # Get the first face's vital signs
        face_data = results[0]
        vital_signs = face_data.get('vital_signs', {})
        
        # Extract raw data
        heart_rate = vital_signs.get('heart_rate', {})
        ppg_waveform = vital_signs.get('ppg_waveform', {})
        respiratory = vital_signs.get('respiratory_rate', {})
        respiratory_waveform = vital_signs.get('respiratory_waveform', {})
        
        fps = 30  # Sampling rate
        
        # Process heart rate time series
        heart_rate_value = heart_rate.get('value', 0)
        heart_rate_timeseries = [
            {
                "time": index / fps,
                # Scale waveform around actual heart rate
                "value": heart_rate_value + (value * 5),
                "confidence": ppg_waveform.get('confidence', [])[index] if index < len(ppg_waveform.get('confidence', [])) else 0
            }
            for index, value in enumerate(ppg_waveform.get('data', []))
        ]
        
        # Process respiratory rate time series
        respiratory_rate_value = respiratory.get('value', 0)
        respiratory_timeseries = [
            {
                "time": index / fps,
                # Scale waveform around actual respiratory rate
                "value": respiratory_rate_value + (value * 2),
                "confidence": respiratory_waveform.get('confidence', [])[index] if index < len(respiratory_waveform.get('confidence', [])) else 0
            }
            for index, value in enumerate(respiratory_waveform.get('data', []))
        ]
        
        # Format the response
        return {
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
                "unit": respiratory.get('unit', 'br/min'),
                "note": respiratory.get('note', "Analysis complete")
            }
        }
        
    except Exception as e:
        logger.error(f"Error processing VitalLens results: {str(e)}")
        logger.debug(f"Raw results: {json.dumps(results, indent=2)}")
        raise

@app.post("/api/vitals")
async def analyze_vitals(video: UploadFile = File(...), fps: Optional[float] = 30.0):
    """Analyze vital signs from uploaded video file."""
    request_temp_dir = None
    try:
        # Log received file info
        logger.info(f"Received video upload - Filename: {video.filename}, "
                    f"Content-Type: {video.content_type}, "
                    f"Size: {video.size / (1024 * 1024):.2f} MB")

        # Create a temporary directory for this request
        request_temp_dir = tempfile.mkdtemp(dir=TEMP_DIR)

        # Save uploaded file to temporary directory
        temp_video_path = os.path.join(request_temp_dir, video.filename)
        content = await video.read()
        
        with open(temp_video_path, 'wb') as f:
            f.write(content)

        # Analyze with VitalLens using app.state
        results = vital_lens(temp_video_path, fps=fps)

        # Process and format results
        results = process_vitallens_results(results)
        

        return results

    except Exception as e:
        logger.error(f"Error in analyze_vitals: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # Clean up request-specific temporary directory
        if request_temp_dir and os.path.exists(request_temp_dir):
            try:
                shutil.rmtree(request_temp_dir)
                logger.debug(f"Cleaned up request temporary directory: {request_temp_dir}")
            except Exception as e:
                logger.error(f"Error cleaning up request directory: {e}")

if __name__ == "__main__":
    logger.info(f"Starting VitalsLens API server... Temporary directory: {TEMP_DIR}")
    try:
        uvicorn.run(
            "test_vitals_api:app",
            host="0.0.0.0",
            port=8000,
            reload=False,
            log_level="info"
        )
    finally:
        cleanup_temp_files()