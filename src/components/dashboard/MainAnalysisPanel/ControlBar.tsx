import { Button } from "@/components/ui/button";
import { Camera, Mic } from "lucide-react";

interface ControlBarProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
}

export function ControlBar({ isRecording, onRecordingChange }: ControlBarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-white">Real-time Analysis</h2>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`bg-white/10 hover:bg-white/20 text-white ${
            isRecording ? 'animate-pulse ring-2 ring-red-500' : ''
          }`}
          onClick={() => onRecordingChange(!isRecording)}
        >
          <Camera className="h-4 w-4 mr-2" />
          {isRecording ? 'Recording...' : 'Start Analysis'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white"
        >
          <Mic className="h-4 w-4 mr-2" />
          Voice Input
        </Button>
      </div>
    </div>
  );
}