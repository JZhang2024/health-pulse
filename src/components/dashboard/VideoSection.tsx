// components/dashboard/VideoSection.tsx
import { useRef, useEffect } from 'react';
import { Camera } from "lucide-react";

interface VideoSectionProps {
  isRecording: boolean;
}

export function VideoSection({ isRecording }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function setupVideo() {
      if (isRecording && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          });
          
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        } catch (err) {
          console.error('Error accessing camera:', err);
        }
      } else {
        // Cleanup when stopping recording
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    }

    setupVideo();

    // Cleanup on component unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
      <div className="relative bg-white/10 backdrop-blur p-6 h-64 flex items-center justify-center">
        {isRecording ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-white font-medium">Recording</span>
            </div>
          </div>
        ) : (
          <div className="text-white/70 text-center">
            <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <div className="text-sm">Start recording to analyze vitals</div>
          </div>
        )}
      </div>
    </div>
  );
}