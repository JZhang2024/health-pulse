'use client';

import { MainAnalysisPanel } from "./MainAnalysisPanel";
import { AnalysisSummary } from "./AnalysisSummary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVitalsMonitor } from "@/hooks/useVitalsMonitor";
import Guidelines from "./Guidelines";
import HealthAssistant from "./HealthAssistant";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

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

    // Display toast notification if there's an error
    if (error) {
        console.log("Error:", error);
        toast.error(error, {duration: 5000});
    }
    

    return (
        <>
            <Guidelines />
            
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
                <HealthAssistant className="h-[500px]" />
            </div>
        </>
    );
}