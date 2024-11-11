import { useState, useCallback, useRef, useEffect } from 'react';

interface CameraConfig {
  maxDuration: number;
  fps: number;
  resolution: {
    width: number;
    height: number;
  };
}

const DEFAULT_CONFIG: CameraConfig = {
  maxDuration: 30,
  fps: 30,
  resolution: {
    width: 1280,
    height: 720
  }
};

export const useCamera = (config: CameraConfig = DEFAULT_CONFIG) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  // Auto-stop recording when max duration is reached
  useEffect(() => {
    if (isRecording && duration >= config.maxDuration) {
      stopRecording();
    }
  }, [duration, config.maxDuration, isRecording]);

  // Timer for duration tracking
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startRecording = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: config.resolution.width },
          height: { ideal: config.resolution.height },
          frameRate: { ideal: config.fps }
        },
        audio: false
      });

      setStream(mediaStream);

      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      videoChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setDuration(0);
      setError(null);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
      throw err;
    }
  }, [config]);

  const stopRecording = useCallback(async () => {
    if (!mediaRecorderRef.current || !isRecording) return null;

    return new Promise<Blob>((resolve, reject) => {
      if (!mediaRecorderRef.current) return reject('No recorder');

      mediaRecorderRef.current.onstop = () => {
        try {
          const videoBlob = new Blob(videoChunksRef.current, { 
            type: 'video/webm;codecs=vp9' 
          });
          resolve(videoBlob);
        } catch (error) {
          reject(error);
        } finally {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
          }
          setIsRecording(false);
          setDuration(0);
          videoChunksRef.current = [];
        }
      };

      mediaRecorderRef.current.stop();
    });
  }, [isRecording, stream]);

  return {
    isRecording,
    duration,
    stream,
    progress: (duration / config.maxDuration) * 100,
    error,
    startRecording,
    stopRecording
  };
};