import { useState, useCallback, useEffect } from 'react';

export const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const startStream = useCallback(async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        setStream(mediaStream);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to access camera');
        setStream(null);
      }
    }, []);
  
    const stopStream = useCallback(() => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }, [stream]);
  
    useEffect(() => {
      return () => {
        stopStream();
      };
    }, [stopStream]);
  
    return {
      stream,
      error,
      startStream,
      stopStream
    };
  };