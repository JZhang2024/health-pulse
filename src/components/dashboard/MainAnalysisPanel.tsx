import { Card } from "@/components/ui/card";
import { VitalMetricCard } from "../vitals/VitalMetricCard";
import { ControlBar } from "./ControlBar";
import { VideoSection } from "./VideoSection";
import type { MainAnalysisPanelProps } from "@/types/components";

export function MainAnalysisPanel({
    isRecording,
    isAnalyzing,
    stream,
    duration,
    onStart,
    onStop,
    vitalsData
}: MainAnalysisPanelProps) {
    return (
        <Card className="bg-white/80 backdrop-blur rounded-xl p-3 sm:p-6 border border-sky-100 shadow-sm">
            <ControlBar
                isRecording={isRecording}
                isAnalyzing={isAnalyzing}
                onStart={onStart}
                onStop={onStop}
            />

            <div className="mb-3 sm:mb-4">
                <VideoSection
                    isRecording={isRecording}
                    duration={duration}
                    maxDuration={25}
                    stream={stream}
                />
            </div>

            <div className="space-y-3 sm:space-y-4">
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
        </Card>
    );
}