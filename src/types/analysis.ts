export interface AnalysisState {
    isAnalyzing: boolean;
    progress: number;
    results: AnalysisResults | null;
    error: string | null;
}

export interface AnalysisResults {
    heartRate: VitalSignData;
    respiratoryRate: VitalSignData;
}

export interface VitalSignData {
    data: number[];
    confidence: number[];
    average: number;
    unit: string;
}
