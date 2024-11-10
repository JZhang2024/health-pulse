import { Button } from "@/components/ui/button";
import { Camera, Mic } from "lucide-react";

interface ControlBarProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onRecordingToggle: () => void;
}

export function ControlBar({ 
  isRecording, 
  isAnalyzing,
  onRecordingToggle 
}: ControlBarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-white">Real-time Analysis</h2>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`bg-white/10 hover:bg-white/20 text-white ${
            isRecording ? 'animate-pulse ring-2 ring-red-500' : ''
          }`}
          onClick={onRecordingToggle}
          disabled={isAnalyzing}
        >
          <Camera className="h-4 w-4 mr-2" />
          {isRecording ? 'Stop Recording' : 
           isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white"
          disabled={isRecording || isAnalyzing}
        >
          <Mic className="h-4 w-4 mr-2" />
          Voice Input
        </Button>
      </div>
    </div>
  );
}