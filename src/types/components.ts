import { VitalsData, VitalMetric, VitalType } from './vitallens';

export interface MainAnalysisPanelProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  stream: MediaStream | null;
  duration: number;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
  vitalsData: VitalsData;
}

export interface ControlBarProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
}

export interface VideoSectionProps {
  isRecording: boolean;
  duration: number;
  maxDuration: number;
  stream: MediaStream | null;
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

export interface RecordingProgressProps {
  duration: number;
  maxDuration: number;
}

export interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface HealthAssistantProps {
  className?: string;
  vitalsData?: VitalsData;
}

export interface HealthAssistantApiResponse {
  response: string;
  conversationId: string;
}