export interface VitalLensResponse {
    vital_signs: {
        running_heart_rate: VitalLensSignal;
        running_respiratory_rate: VitalLensSignal;
    };
}

export interface VitalLensSignal {
    data: number[];
    unit: string;
    confidence: number[];
    note: string;
}