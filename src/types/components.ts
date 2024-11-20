import { VitalsData } from './vitallens';

export interface MainAnalysisPanelProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  stream: MediaStream | null;
  duration: number;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
  vitalsData: VitalsData;
  countdown: number;
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
  countdown: number;
}

// Vitals component props
export interface ConfidenceBadgeProps {
  confidence: number;
}

export interface RecordingProgressProps {
  duration: number;
  maxDuration: number;
}

export interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface HealthAssistantApiResponse {
  response: string;
  conversationId: string;
}