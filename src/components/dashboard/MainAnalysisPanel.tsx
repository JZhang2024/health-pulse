import { Card } from "@/components/ui/card";
import { VitalMetricCard } from "../vitals/VitalMetricCard";
import { ControlBar } from "./ControlBar";
import { VideoSection } from "./VideoSection";
import type { VitalsData } from "@/types/vitallens";

interface MainAnalysisPanelProps {
    isRecording: boolean;
    isAnalyzing: boolean;
    stream: MediaStream | null;
    duration: number;
    onStart: () => Promise<void>;
    onStop: () => Promise<void>;
    vitalsData: VitalsData;
}

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
        <div className="lg:col-span-8 space-y-4">
            <Card className="bg-white/80 backdrop-blur rounded-xl p-6 border border-sky-100 shadow-sm">
                <ControlBar 
                    isRecording={isRecording} 
                    isAnalyzing={isAnalyzing}
                    onStart={onStart}
                    onStop={onStop}
                />

                <div className="mb-4">
                    <VideoSection 
                        isRecording={isRecording}
                        duration={duration}
                        maxDuration={30}
                        stream={stream}
                    />
                </div>

                <div className="space-y-4">
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
        </div>
    );
}