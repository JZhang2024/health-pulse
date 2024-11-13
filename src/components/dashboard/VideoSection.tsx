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
    <div className="relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20" />
      <div className="relative bg-sky-50/50 backdrop-blur p-6 h-64">
        {isRecording && stream ? (
          <>
            <video
              ref={(video) => {
                if (video && stream) video.srcObject = stream;
              }}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="w-full">
                <div className="flex justify-between text-sm text-sky-950 mb-1">
                  <span>{duration}s</span>
                  <span>{maxDuration}s</span>
                </div>
                <div className="h-2 bg-sky-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sky-500 transition-all duration-1000"
                    style={{ width: `${(duration / maxDuration) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-sky-700 text-center">
              <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <div className="text-sm">Start recording to analyze vitals</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}