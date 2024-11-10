// Base interface without confidence (since it varies)
interface BaseMetric {
    unit: string;
    note: string;
  }
  
  // For single-value metrics (heart_rate, respiratory_rate)
  export interface GlobalMetric extends BaseMetric {
    value: number;
    confidence: number;  // Scalar confidence value
  }
  
  // For time-series data (ppg_waveform, respiratory_waveform)
  export interface WaveformMetric extends BaseMetric {
    data: number[];      // Array of values per frame
    confidence: number[];  // Array of confidence values per frame
  }
  
  // Face detection data
  export interface FaceData {
    coordinates: number[][];  // [n_frames, 4]
    confidence: number[];     // [n_frames]
    note: string;
  }
  
  // Complete vital signs structure from API
  export interface VitalSigns {
    heart_rate: GlobalMetric;
    respiratory_rate: GlobalMetric;
    ppg_waveform: WaveformMetric;
    respiratory_waveform: WaveformMetric;
    running_heart_rate?: WaveformMetric;
    running_respiratory_rate?: WaveformMetric;
  }
  
  // Complete API response for each face
  export interface VitalLensResult {
    face: FaceData;
    vital_signs: VitalSigns;
    message: string;
  }
  
  // Processed time series data point for UI
  export interface TimeSeriesDataPoint {
    time: number;
    value: number;
    confidence: number;
  }
  
  // Processed metric format for UI components
  export interface VitalMetric {
    timeSeries: TimeSeriesDataPoint[];
    average: number;
    confidence: number; // Global confidence for the metric
    unit: string;
    note: string;
  }
  
  // Main data structure used by UI components
  export interface VitalsData {
    heartRate: VitalMetric;
    respiratoryRate: VitalMetric;
  }
  
  export type VitalType = 'heartRate' | 'respiratoryRate';
  
  // API configuration types
  export interface VitalLensConfig {
    apiKey: string;
    detectFaces?: boolean;
    estimateRunningVitals?: boolean;
    fdetMaxFaces?: number;
    fdetFs?: number;
    exportToJson?: boolean;
    exportDir?: string;
  }
  
  // API Response types
  export interface VitalLensApiResponse {
    results: VitalLensResult[];
    error?: string;
  }
  
  // API Error types
  export interface VitalLensApiError {
    error: string;
    code?: string;
    details?: unknown;
  }