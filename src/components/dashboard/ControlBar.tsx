import { Button } from "@/components/ui/button";
import { Camera, Mic } from "lucide-react";

interface ControlBarProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
}

export function ControlBar({ 
  isRecording, 
  isAnalyzing,
  onStart,
  onStop
}: ControlBarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-sky-950">Estimate Vitals</h2>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`
            ${isRecording 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
              : 'bg-sky-500 hover:bg-sky-600 text-white'
            } shadow-sm transition-colors px-4 py-2 rounded-md text-sm
          `}
          onClick={isRecording ? onStop : onStart}
          disabled={isAnalyzing}
        >
          <Camera className="h-4 w-4 mr-2" />
          {isRecording ? 'Stop Recording' : 
           isAnalyzing ? 'Analyzing...' : 'Start Recording'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="bg-slate-100 hover:bg-slate-200 text-sky-950 shadow-sm transition-colors px-4 py-2 rounded-md text-sm"
          disabled={isRecording || isAnalyzing}
        >
          <Mic className="h-4 w-4 mr-2" />
          Voice Input
        </Button>
      </div>
    </div>
  );
}