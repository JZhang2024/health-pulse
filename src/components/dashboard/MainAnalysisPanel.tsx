import { Card } from "@/components/ui/card";
import { VitalMetricCard } from "../vitals/VitalMetricCard";
import { ControlBar } from "./ControlBar";
import { VideoSection } from "./VideoSection";
import type { VitalsData } from "@/types/vitallens";

interface MainAnalysisPanelProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onRecordingToggle: () => void;
  vitalsData: VitalsData;
}

export function MainAnalysisPanel({ 
  isRecording, 
  isAnalyzing,
  onRecordingToggle, 
  vitalsData 
}: MainAnalysisPanelProps) {
  return (
    <div className="lg:col-span-8 space-y-4">
      <Card className="p-6 bg-white/10 backdrop-blur border-none">
        <ControlBar 
          isRecording={isRecording} 
          isAnalyzing={isAnalyzing}
          onRecordingToggle={onRecordingToggle}
        />

        <div className="space-y-4 mb-4">
          <VitalMetricCard
            title="Heart Rate Monitor"
            metric={vitalsData.heartRate}
            type="heartRate"
          />
          <VitalMetricCard
            title="Respiratory Rate Monitor"
            metric={vitalsData.respiratoryRate}
            type="respiratoryRate"
          />
        </div>

        <VideoSection isRecording={isRecording} />
      </Card>
    </div>
  );
}