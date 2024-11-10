// types/components.ts

import { VitalsData, VitalMetric, VitalType } from './vitallens';

// Dashboard component props
export interface DashboardClientProps {
  // Currently empty as DashboardClient manages its own state
}

export interface MainAnalysisPanelProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onRecordingToggle: () => void;
  vitalsData: VitalsData;
}

export interface ControlBarProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onRecordingToggle: () => void;
}

export interface VideoSectionProps {
  isRecording: boolean;
}

export interface AnalysisSummaryProps {
  vitalsData: VitalsData;
}

// Vitals component props
export interface ConfidenceBadgeProps {
  confidence: number;
}

export interface VitalsChartProps {
  data: Array<{
    time: number;
    value: number;
    confidence: number;
  }>;
  unit: string;
  type: VitalType;
}

export interface VitalMetricCardProps {
  title: string;
  metric: VitalMetric;
  type: VitalType;
}