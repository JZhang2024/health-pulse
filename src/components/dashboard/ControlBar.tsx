import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { ControlBarProps } from "@/types/components";

export function ControlBar({ 
  isRecording, 
  isAnalyzing,
  onStart,
  onStop
}: ControlBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-sky-950">Estimate Vitals</h2>
      <Button 
        variant="ghost" 
        size="sm"
        className={`
          w-full sm:w-auto
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
    </div>
  );
}