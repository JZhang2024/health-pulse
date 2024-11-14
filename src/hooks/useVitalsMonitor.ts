// useVitalsMonitor.ts
import { useState, useEffect, useCallback } from 'react';
import { useCamera } from './useCamera';
import { VitalsData } from '@/types/vitallens';
import { config } from '@/config';

const DEFAULT_VITALS_DATA: VitalsData = {
  heartRate: {
    timeSeries: [],
    average: 0,
    confidence: 0,
    unit: "bpm",
    note: "Waiting for data..."
  },
  respiratoryRate: {
    timeSeries: [],
    average: 0,
    confidence: 0,
    unit: "br/min",
    note: "Waiting for data..."
  }
};

interface UploadUrlResponse {
  uploadUrl: string;
  videoId: string;
}

export const useVitalsMonitor = () => {
  const camera = useCamera();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vitalsData, setVitalsData] = useState<VitalsData>(DEFAULT_VITALS_DATA);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (camera.isRecording && camera.duration >= 19) { // Stop at 28 seconds
      stopMonitoring();
    }
  }, [camera.duration, camera.isRecording]);

  const getUploadUrl = async (fileType: string): Promise<UploadUrlResponse> => {
    const response = await fetch(`${config.api.baseUrl}/get-upload-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileType })
    });

    if (!response.ok) {
      throw new Error('Failed to get upload URL');
    }

    return response.json();
  };

  const uploadToS3 = async (url: string, file: Blob): Promise<void> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setUploadProgress(percentComplete);
            }
        });

        xhr.addEventListener('load', () => {
            // S3 returns 200 for successful uploads
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
            } else {
                console.error('Upload failed with response:', xhr.responseText);
                reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => {
            console.error('Upload network error:', xhr.responseText);
            reject(new Error('Network error during upload'));
        });

        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', file.type);
        
        // Log request details for debugging
        console.log('Uploading with:', {
            url,
            contentType: file.type,
            fileSize: file.size
        });

        xhr.send(file);
    });
};

  const analyzeVideo = async (videoBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      setUploadProgress(0);

      // 1. Get pre-signed URL
      const { uploadUrl, videoId } = await getUploadUrl(videoBlob.type);

      // 2. Upload to S3
      console.log('Uploading video to S3...');
      await uploadToS3(uploadUrl, videoBlob);
      console.log('Upload complete');

      // 3. Trigger processing

      // log endpoint for debugging
      console.log(`${config.api.baseUrl}/process-video`);
      const processResponse = await fetch(`${config.api.baseUrl}/process-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId })
      });

      if (!processResponse.ok) {
        const errorData = await processResponse.json();
        throw new Error(errorData.detail || 'Failed to process video');
      }

      const results = await processResponse.json();
      setVitalsData(results);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze video';
      setError(errorMessage);
      console.error('Video analysis error:', { message: errorMessage, error });
      throw error;
    } finally {
      setIsAnalyzing(false);
      setUploadProgress(0);
    }
  };

  const startMonitoring = async () => {
    setError(null);
    try {
      await camera.startRecording();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start recording';
      setError(errorMessage);
      console.error('Recording start error:', { message: errorMessage, error });
    }
  };

  const stopMonitoring = async () => {
    try {
      const videoBlob = await camera.stopRecording();
      if (videoBlob) {
        await analyzeVideo(videoBlob);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process video';
      setError(errorMessage);
      console.error('Monitoring error:', { 
        message: errorMessage,
        error: error as Error | unknown
      });
    }
  };

  return {
    ...camera,
    isAnalyzing,
    vitalsData,
    error: error || camera.error,
    uploadProgress,
    startMonitoring,
    stopMonitoring,
    currentFormat: camera.currentMimeType
  };
};