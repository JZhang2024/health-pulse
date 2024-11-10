// Base types for all metrics
interface BaseMetric {
    unit: string;
    confidence: number;
    note: string;
}

// For single-value metrics (heart_rate, respiratory_rate)
interface GlobalMetric extends BaseMetric {
    value: number;
}

// For time-series data (ppg_waveform, respiratory_waveform, running metrics)
interface WaveformMetric extends BaseMetric {
    data: number[];
}

// Face detection data
interface FaceData {
    coordinates: number[][];  // [n_frames, 4]
    confidence: number[];    // [n_frames]
    note: string;
}

// Complete vital signs data structure
interface VitalSigns {
    heart_rate: GlobalMetric;
    respiratory_rate: GlobalMetric;
    ppg_waveform: WaveformMetric;
    respiratory_waveform: WaveformMetric;
    running_heart_rate?: WaveformMetric;
    running_respiratory_rate?: WaveformMetric;
}

// Complete response for each face
export interface VitalLensResult {
    face: FaceData;
    vital_signs: VitalSigns;
    message: string;
}

// Simplified version of the data we actually use in our UI
export interface VitalsData {
    heartRate: {
        timeSeries: Array<{
            time: number;
            value: number;
            confidence: number;
        }>;
        average: number;
        confidence: number;
        unit: string;
        note: string;
    };
    respiratoryRate: {
        timeSeries: Array<{
            time: number;
            value: number;
            confidence: number;
        }>;
        average: number;
        confidence: number;
        unit: string;
        note: string;
    };
}

export type VitalType = 'heartRate' | 'respiratoryRate';