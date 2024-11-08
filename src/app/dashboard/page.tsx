'use client';

import { useState } from 'react';
import { MainAnalysisPanel } from "@/components/dashboard/MainAnalysisPanel";
import { SidePanel } from "@/components/dashboard/SidePanel";

export default function DashboardPage() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        <MainAnalysisPanel 
          isRecording={isRecording}
          onRecordingChange={setIsRecording}
        />
        <SidePanel />
      </div>
    </div>
  );
}