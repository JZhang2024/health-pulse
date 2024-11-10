// types/api.ts

import { VitalLensResult } from './vitallens';

export interface AnalyzeVideoRequest {
  video: Blob;
  fps?: number;
}

export interface AnalyzeVideoResponse {
  results: VitalLensResult[];
}

export interface ApiErrorResponse {
  error: string;
  status: number;
}

export type ApiResponse<T> = T | ApiErrorResponse;