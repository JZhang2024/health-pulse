export type RecordingState = 'idle' | 'recording' | 'processing' | 'complete';

export interface TimeSeriesData {
  time: Date | string;
  value: number;
}