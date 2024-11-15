'use client';

import { MainAnalysisPanel } from "./MainAnalysisPanel";
import { AnalysisSummary } from "./AnalysisSummary";
import { useVitalsMonitor } from "@/hooks/useVitalsMonitor";
import Guidelines from "./Guidelines";
import HealthAssistant from "./HealthAssistant";
import { toast } from "sonner";
import { useEffect } from "react";

export function DashboardClient() {
    const { 
        vitalsData, 
        isRecording, 
        isAnalyzing,
        error, 
        stream,
        duration,
        uploadProgress,
        startMonitoring, 
        stopMonitoring 
    } = useVitalsMonitor();

    // Display toast notification if there's an error
    if (error) {
        console.log("Error:", error);
        toast.error(error, {duration: 5000});
    }

    // Show upload progress toast when uploading
    useEffect(() => {
        if (uploadProgress > 0 && uploadProgress < 100) {
            toast.info(`Uploading video: ${Math.round(uploadProgress)}%`, {
                duration: 2000,
                id: 'upload-progress' // Prevent duplicate toasts
            });
        }
    }, [uploadProgress]);

    return (
        <>
            <Guidelines />
            
            <MainAnalysisPanel 
                isRecording={isRecording}
                isAnalyzing={isAnalyzing || uploadProgress > 0} // Consider upload as part of analysis phase
                stream={stream}
                duration={duration}
                onStart={startMonitoring}
                onStop={stopMonitoring}
                vitalsData={vitalsData}
            />
            
            <div className="lg:col-span-4 space-y-4">
                <AnalysisSummary vitalsData={vitalsData} />
                <HealthAssistant className="h-[500px]" vitalsData={vitalsData} />
            </div>
        </>
    );
}