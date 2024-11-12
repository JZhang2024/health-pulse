import { useState, useEffect} from 'react';
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

export const useVitalsMonitor = () => {
  const camera = useCamera();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vitalsData, setVitalsData] = useState<VitalsData>(DEFAULT_VITALS_DATA);
  const [error, setError] = useState<string | null>(null);

  // Handle both manual stop and timeout
  useEffect(() => {
    if (camera.isRecording && camera.duration >= 30) {
      stopMonitoring();
    }
  }, [camera.duration, camera.isRecording]);


  const analyzeVideo = async (videoBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      
      // Create a File object from the Blob
      // The name with .webm extension helps servers identify the file type
      const videoFile = new File([videoBlob], 'recording.webm', { 
        type: videoBlob.type 
      });
      
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('fps', '30');

      const response = await fetch(config.api.baseUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze video');
      }

      const results = await response.json();
      setVitalsData(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze video');
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startMonitoring = async () => {
    setError(null);
    await camera.startRecording();
  };

  const stopMonitoring = async () => {
    try {
      const videoBlob = await camera.stopRecording();
      if (videoBlob) {
        await analyzeVideo(videoBlob);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process video');
    }
  };

  return {
    ...camera,
    isAnalyzing,
    vitalsData,
    error: error || camera.error,
    startMonitoring,
    stopMonitoring
  };
};