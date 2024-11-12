'use client';

import { MainAnalysisPanel } from "./MainAnalysisPanel";
import { AnalysisSummary } from "./AnalysisSummary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVitalsMonitor } from "@/hooks/useVitalsMonitor";
import VitalMeasurementGuide from "./VitalMeasurementGuide";

export function DashboardClient() {
    const { 
        vitalsData, 
        isRecording, 
        isAnalyzing,
        error, 
        stream,
        duration,
        startMonitoring, 
        stopMonitoring 
    } = useVitalsMonitor();

    return (
        <>
            <VitalMeasurementGuide />
            {error && (
                <div className="lg:col-span-12 mb-4">
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            )}
            <MainAnalysisPanel 
                isRecording={isRecording}
                isAnalyzing={isAnalyzing}
                stream={stream}
                duration={duration}
                onStart={startMonitoring}
                onStop={stopMonitoring}
                vitalsData={vitalsData}
            />
            <div className="lg:col-span-4 space-y-4">
                <AnalysisSummary vitalsData={vitalsData} />
            </div>
        </>
    );
}