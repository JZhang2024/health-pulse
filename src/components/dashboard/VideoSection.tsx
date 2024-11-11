import { useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import { RecordingProgress } from "../vitals/RecordingProgress";

interface VideoSectionProps {
  isRecording: boolean;
  duration: number;
  maxDuration: number;
  stream: MediaStream | null;
}

export function VideoSection({ 
  isRecording, 
  duration,
  maxDuration,
  stream 
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
      <div className="relative bg-white/10 backdrop-blur p-6 h-64">
        {isRecording && stream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <RecordingProgress 
                duration={duration} 
                maxDuration={maxDuration}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white/70 text-center">
              <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <div className="text-sm">Start recording to analyze vitals</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}