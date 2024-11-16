'use client';

import { MainAnalysisPanel } from "./MainAnalysisPanel";
import { AnalysisSummary } from "./AnalysisSummary";
import { useVitalsMonitor } from "@/hooks/useVitalsMonitor";
import Guidelines from "./Guidelines";
import HealthAssistant from "./HealthAssistant";
import { toast } from "sonner";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export function DashboardClient() {
    const { 
        vitalsData, 
        isRecording, 
        isAnalyzing,
        error, 
        stream,
        duration,
        uploadProgress,
        analysisProgress,
        startMonitoring, 
        stopMonitoring 
    } = useVitalsMonitor();

    // Display toast notification if there's an error
    useEffect(() => {
        if (error) {
            console.log("Error:", error);
            toast.error(error, { duration: 5000 });
        }
    }, [error]);

    // Show upload progress toast when uploading
    useEffect(() => {
        if (uploadProgress > 0 && uploadProgress < 100) {
            toast.info(
                <div className="w-full">
                    <p className="mb-2">Uploading video...</p>
                    <Progress value={uploadProgress} className="h-1" />
                </div>,
                {
                    duration: 2000,
                    id: 'upload-progress'
                }
            );
        }
    }, [uploadProgress]);

    // Show analysis progress toast when analyzing
    useEffect(() => {
        if (analysisProgress > 0 && analysisProgress < 100) {
            toast.info(
                <div className="w-full">
                    <p className="mb-2">Analyzing vital signs...</p>
                    <Progress value={analysisProgress} className="h-1" />
                </div>,
                {
                    duration: 2000,
                    id: 'analysis-progress'
                }
            );
        }
    }, [analysisProgress]);

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
                <AnalysisSummary />
                <HealthAssistant />
            </div>
        </>
    );
}
