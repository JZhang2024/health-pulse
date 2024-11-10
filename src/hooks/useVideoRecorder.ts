import { useCallback, useEffect, useRef, useState } from 'react';

interface UseVideoRecorderProps {
    stream: MediaStream | null;
    onDataAvailable?: (data: Blob) => void;
  }
  
  export const useVideoRecorder = ({ stream, onDataAvailable }: UseVideoRecorderProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
    const startRecording = useCallback(() => {
      if (!stream) {
        setError('No media stream available');
        return;
      }
  
      try {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9'
        });
  
        mediaRecorderRef.current = mediaRecorder;
  
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && onDataAvailable) {
            onDataAvailable(event.data);
          }
        };
  
        mediaRecorder.start(1000); // Collect data every second
        setIsRecording(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start recording');
        setIsRecording(false);
      }
    }, [stream, onDataAvailable]);
  
    const stopRecording = useCallback(() => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }, [isRecording]);
  
    useEffect(() => {
      return () => {
        if (mediaRecorderRef.current && isRecording) {
          mediaRecorderRef.current.stop();
        }
      };
    }, [isRecording]);
  
    return {
      isRecording,
      error,
      startRecording,
      stopRecording
    };
  };