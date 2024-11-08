import { Card } from "@/components/ui/card";
import { ControlBar } from "./ControlBar";
import { VitalsMonitor } from "../Charts/VitalsMonitor";
import { SymptomMap } from "../Charts/SymptomMap";
import { VideoSection } from "./VideoSection";

interface MainAnalysisPanelProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
}

export function MainAnalysisPanel({ 
  isRecording, 
  onRecordingChange 
}: MainAnalysisPanelProps) {
  return (
    <div className="lg:col-span-8 space-y-4">
      <Card className="p-6 bg-white/10 backdrop-blur border-none">
        <ControlBar 
          isRecording={isRecording} 
          onRecordingChange={onRecordingChange}
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <VitalsMonitor />
          <SymptomMap />
        </div>

        <VideoSection isRecording={isRecording} />
      </Card>
    </div>
  );
}