import { useState, useEffect, useCallback } from 'react';
import { useCamera } from './useCamera';
import { UploadUrlResponse } from '@/types/vitallens';
import { config } from '@/config';
import { useDashboardStore } from '@/stores/useDashboardStore';

export const useVitalsMonitor = () => {
  const vitalsData = useDashboardStore(state => state.vitalsData);
  const setVitalsData = useDashboardStore(state => state.setVitalsData);
  const camera = useCamera();
  const { stopRecording } = camera;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const getUploadUrl = useCallback(async (fileType: string): Promise<UploadUrlResponse> => {
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
  }, []);

  const uploadToS3 = useCallback(async (url: string, file: Blob): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
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

      console.log('Uploading with:', {
        url,
        contentType: file.type,
        fileSize: file.size
      });

      xhr.send(file);
    });
  }, []);

  const analyzeVideo = useCallback(async (videoBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      setUploadProgress(0);

      const { uploadUrl, videoId } = await getUploadUrl(videoBlob.type);

      console.log('Uploading video to S3...');
      await uploadToS3(uploadUrl, videoBlob);
      console.log('Upload complete');

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
      setAnalysisProgress(100);
      setVitalsData(results);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze video';
      setError(errorMessage);
      console.error('Video analysis error:', { message: errorMessage, error });
      throw error;
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        setUploadProgress(0);
        setAnalysisProgress(0);
      }, 1000);
    }
  }, [getUploadUrl, uploadToS3, setVitalsData]);

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

  const stopMonitoring = useCallback(async () => {
    try {
      const videoBlob = await stopRecording();
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
  }, [stopRecording, analyzeVideo]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (isAnalyzing && uploadProgress === 100) {
      setAnalysisProgress(0);

      progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev < 90) {
            return Math.min(90, prev + (90 - prev) / 10);
          }
          return prev;
        });
      }, 500);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isAnalyzing, uploadProgress]);

  useEffect(() => {
    if (camera.isRecording && camera.duration >= 25) {
      stopMonitoring();
    }
  }, [camera.duration, camera.isRecording, stopMonitoring]);

  return {
    ...camera,
    isAnalyzing,
    vitalsData,
    error: error || camera.error,
    uploadProgress,
    analysisProgress,
    startMonitoring,
    stopMonitoring,
    currentFormat: camera.currentMimeType
  };
};
