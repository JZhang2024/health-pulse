from vitallens import VitalLens, Method
import numpy as np
import cv2
import os
from http import HTTPStatus

def init_vitallens() -> VitalLens:
    """Initialize VitalLens client with configuration."""
    return VitalLens(
        method=Method.VITALLENS,
        api_key=os.environ.get("VITALLENS_API_KEY"),
        detect_faces=True,
        estimate_running_vitals=True
    )

async def POST(request):
    try:
        # Initialize VitalLens client
        vl = init_vitallens()
        
        # Get form data from request
        form = await request.form()
        video_file = form.get("video")
        fps = float(form.get("fps", 30.0))
        
        if not video_file:
            return {
                "status_code": HTTPStatus.BAD_REQUEST,
                "body": {"error": "No video file provided"}
            }
        
        # Read video data
        video_bytes = await video_file.read()
        nparr = np.frombuffer(video_bytes, np.uint8)
        video_array = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Process with VitalLens
        results = vl(video_array, fps=fps)
        
        return {
            "status_code": HTTPStatus.OK,
            "body": results
        }
        
    except Exception as e:
        print(f"Error processing video: {str(e)}")
        return {
            "status_code": HTTPStatus.INTERNAL_SERVER_ERROR,
            "body": {"error": str(e)}
        }