import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  VitalsData, 
  TimeSeriesDataPoint, 
  VitalLensResult,
  WaveformMetric 
} from '@/types/vitallens';

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
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vitalsData, setVitalsData] = useState<VitalsData>(DEFAULT_VITALS_DATA);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Process raw VitalLens data into UI format
  const processVitalsData = useCallback((data: VitalLensResult[]) => {
    if (!data.length || !data[0].vital_signs) return;
    
    const firstResult = data[0];
    const { vital_signs } = firstResult;
    
    const fps = 30; // This should match the recording FPS
  
    // Helper function to process waveform data
    const createTimeSeries = (waveform: WaveformMetric): TimeSeriesDataPoint[] => {
      return waveform.data.map((value, i) => ({
        time: i / fps,
        value: value,
        confidence: waveform.confidence[i] // Now correctly accessing array of confidence values
      }));
    };
  
    setVitalsData({
      heartRate: {
        timeSeries: createTimeSeries(vital_signs.ppg_waveform),
        average: vital_signs.heart_rate.value,
        confidence: vital_signs.heart_rate.confidence, // Scalar confidence value
        unit: vital_signs.heart_rate.unit,
        note: vital_signs.heart_rate.note
      },
      respiratoryRate: {
        timeSeries: createTimeSeries(vital_signs.respiratory_waveform),
        average: vital_signs.respiratory_rate.value,
        confidence: vital_signs.respiratory_rate.confidence, // Scalar confidence value
        unit: vital_signs.respiratory_rate.unit,
        note: vital_signs.respiratory_rate.note
      }
    });
  }, []);

  // Send video to API for analysis
  const analyzeVideo = async (videoBlob: Blob) => {
    const formData = new FormData();
    formData.append('video', videoBlob);
    formData.append('fps', '30');

    try {
      setIsAnalyzing(true);
      const response = await fetch('/api/vitals', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze video');
      }

      const results = await response.json();
      processVitalsData(results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to analyze video');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Initialize media recorder and start recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      videoChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const videoBlob = new Blob(videoChunksRef.current, { 
          type: 'video/webm;codecs=vp9' 
        });
        await analyzeVideo(videoBlob);
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setError(null);
    } catch (error) {
      setError('Failed to start recording: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setIsRecording(false);
    }
  }, []);

  // Stop recording and clean up
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, [isRecording]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  return {
    vitalsData,
    isRecording,
    isAnalyzing,
    error,
    toggleRecording,
    startRecording,
    stopRecording
  };
};