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
  maxDuration: 25,
  fps: 30,
  resolution: {
    width: 1280,  // Increased to 1080p
    height: 720
  }
};

// Helper to find the best supported MP4 codec
const getBestMP4Codec = () => {
  const codecs = [
    'video/mp4;codecs=h264',
    'video/mp4;codecs=avc1',
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4;codecs=avc1.42001E'
  ];
  
  return codecs.find(codec => MediaRecorder.isTypeSupported(codec)) || null;
};

export const useCamera = (config: CameraConfig = DEFAULT_CONFIG) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const countdownRef = useRef<NodeJS.Timeout>();

  // Fallback to WebM if MP4 is not supported
  const startWebMRecording = useCallback(async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: 'user',
        width: { ideal: config.resolution.width, min: 1280 },
        height: { ideal: config.resolution.height, min: 720 },
        frameRate: { exact: config.fps },
        aspectRatio: { ideal: 16/9 },
      },
      audio: false
    });
  
    setStream(mediaStream);
  
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 8000000
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
  }, [config.resolution.width, config.resolution.height, config.fps]);

  const stopRecording = useCallback(async () => {
    if (!mediaRecorderRef.current || !isRecording) return null;

    return new Promise<Blob>((resolve, reject) => {
      if (!mediaRecorderRef.current) return reject('No recorder');

      mediaRecorderRef.current.onstop = () => {
        try {
          const videoBlob = new Blob(videoChunksRef.current, { 
            type: mediaRecorderRef.current?.mimeType || 'video/mp4'
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
  
  const startRecording = useCallback(async () => {
    try {
      // Get the best supported MP4 codec
      const mimeType = getBestMP4Codec();
      if (!mimeType) {
        throw new Error('MP4 recording is not supported in this browser');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: config.resolution.width, min: 1280 },
          height: { ideal: config.resolution.height, min: 720 },
          frameRate: { ideal: config.fps, min: 15 },
          aspectRatio: { ideal: 16/9 },
        },
        audio: false
      });

      setStream(mediaStream);
      
      // Simple countdown
      setCountdown(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(0);

      // Start recording
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType,
        videoBitsPerSecond: 8000000
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to start recording';
      setError(errorMessage);
      
      // If it's a codec support error, fall back to WebM with high quality
      if (errorMessage.includes('MP4') || errorMessage.includes('not supported')) {
        try {
          await startWebMRecording();
        } catch (fallbackErr) {
          throw new Error(`Failed to start recording with both MP4 and WebM: ${fallbackErr}`);
        }
      } else {
        throw err;
      }
    }
  }, [config, startWebMRecording]);
  
  // Auto-stop recording when max duration is reached
  useEffect(() => {
    if (isRecording && duration >= config.maxDuration) {
      stopRecording();
    }
  }, [duration, config.maxDuration, isRecording, stopRecording]);

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
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  return {
    isRecording,
    duration,
    error,
    stream,
    countdown,
    startRecording,
    stopRecording,
    currentMimeType: mediaRecorderRef.current?.mimeType || null
  };
};
