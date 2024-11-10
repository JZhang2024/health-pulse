export interface VideoRecordingState {
    isRecording: boolean;
    isPaused: boolean;
    duration: number;
    error: string | null;
}

export interface VideoRecordingOptions {
    maxDuration: number;
    frameRate: number;
    width: number;
    height: number;
}