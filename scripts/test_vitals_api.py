from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from vitallens import VitalLens, Method
import uvicorn
import numpy as np
import cv2
from typing import Optional
import os
from dotenv import load_dotenv
import logging
import json

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Get the correct path to .env.local (going up one directory from scripts)
# root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# env_path = os.path.join(root_dir, '.env')
# logger.debug(f"Looking for .env file at: {env_path}")

# Load environment variables with explicit path and debugging
# env_path = os.path.join(os.path.dirname(__file__), '.env')
loaded = load_dotenv()
logger.debug(f"Loaded .env file: {loaded}")

# Debug environment variables
api_key = os.getenv("VITALLENS_API_KEY")
logger.debug(f"VITALLENS_API_KEY present: {bool(api_key)}")
if not api_key:
    raise ValueError("VITALLENS_API_KEY not found in environment variables")

app = FastAPI()

# Configure CORS for local development
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
        estimate_running_vitals=True
    )
    logger.debug("VitalLens client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize VitalLens client: {str(e)}")
    raise

@app.post("/api/vitals")
async def analyze_vitals(video: UploadFile = File(...), fps: Optional[float] = 30.0):
    try:
        logger.debug(f"Processing video with fps: {fps}")
        
        # The video file is directly available in video.file
        results = vital_lens(video.file)
        
        # Pretty print the results to console
        logger.info("VitalLens API Response:")
        logger.info(json.dumps(results, indent=2))
        logger.debug("Video processing completed successfully")
        
        return results
    
    except Exception as e:
        logger.error(f"Error processing video: {str(e)}")
        return {"error": str(e)}, 500

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "development",
        "env_loaded": loaded,
        "api_key_present": bool(api_key)
    }

if __name__ == "__main__":
    logger.info("Starting server...")
    uvicorn.run("test_vitals_api:app", host="0.0.0.0", port=8000, reload=False)