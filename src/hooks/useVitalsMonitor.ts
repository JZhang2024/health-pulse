import { useState } from 'react';
import { useCamera } from './useCamera';
import { VitalsData } from '@/types/vitallens';

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

  const analyzeVideo = async (videoBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      
      const formData = new FormData();
      formData.append('video', videoBlob);
      formData.append('fps', '30');

      const response = await fetch('/api/vitals', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to analyze video');
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