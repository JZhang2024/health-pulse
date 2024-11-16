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
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20" />
      <div className="relative bg-sky-50/50 backdrop-blur p-4 sm:p-6 h-48 sm:h-64">
        {isRecording && stream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <RecordingProgress duration={duration} maxDuration={maxDuration} />
            </div>
          </>
        ) : (
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