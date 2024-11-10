'use client';

import { MainAnalysisPanel } from "./MainAnalysisPanel";
import { AnalysisSummary } from "./AnalysisSummary";
import { useVitalsMonitor } from '@/hooks/useVitalsMonitor';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DashboardClient() {
  const { 
    vitalsData, 
    isRecording, 
    isAnalyzing,
    error, 
    toggleRecording 
  } = useVitalsMonitor();

  return (
    <>
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
        onRecordingToggle={toggleRecording}
        vitalsData={vitalsData}
      />
      <div className="lg:col-span-4 space-y-4">
        <AnalysisSummary vitalsData={vitalsData} />
      </div>
    </>
  );
}