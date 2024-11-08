import { Camera } from "lucide-react";

interface VideoSectionProps {
  isRecording: boolean;
}

export function VideoSection({ isRecording }: VideoSectionProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
      <div className="relative bg-white/10 backdrop-blur rounded-lg p-4 h-64 flex items-center justify-center">
        <div className="text-white/70 text-center">
          <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
          {isRecording ? (
            <div className="space-y-2">
              <div className="text-sm">Analyzing video feed...</div>
              <div className="flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm">
              Start video analysis for visual symptom detection
            </div>
          )}
        </div>
      </div>
    </div>
  );
}