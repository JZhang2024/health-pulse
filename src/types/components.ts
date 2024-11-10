export interface ChartData {
    time: number | string;
    value: number;
    confidence?: number;
  }
  
  export interface MainAnalysisPanelProps {
    isRecording: boolean;
    onRecordingChange: (recording: boolean) => void;
  }
  
  export interface ControlBarProps {
    isRecording: boolean;
    onRecordingChange: (recording: boolean) => void;
    disabled?: boolean;
  }
  
  export interface VitalsChartProps {
    data: ChartData[];
    type: 'heartRate' | 'respiratoryRate';
    unit: string;
    title: string;
  }
  
  export interface VideoSectionProps {
    isRecording: boolean;
    isAnalyzing: boolean;
    progress: number;
    error?: string | null;
  }