import { useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import { RecordingProgress } from "../vitals/RecordingProgress";
import { VideoSectionProps } from "@/types/components";

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
    <div className="relative rounded-xl overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20" />
      
      {/* Main container - reduced height on mobile */}
      <div className="relative bg-sky-50/50 backdrop-blur p-3 sm:p-6 h-40 sm:h-64">
        {isRecording && stream ? (
          <>
            {/* Video element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Progress bar container - adjusted positioning for mobile */}
            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
              <RecordingProgress duration={duration} maxDuration={maxDuration} />
            </div>
          </>
        ) : (
          // Placeholder content when not recording
          <div className="flex items-center justify-center h-full">
            <div className="text-sky-700 text-center">
              <Camera className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2 opacity-50" />
              <div className="text-xs sm:text-sm">Start recording to analyze vitals</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}