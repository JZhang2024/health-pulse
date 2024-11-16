import type { VitalsData } from '@/types/vitallens';

export const DEFAULT_VITALS_DATA: VitalsData = {
  heartRate: {
    timeSeries: [],
    average: 0,
    confidence: 0,
    unit: "bpm",
    note: "Waiting for data..."
  },
  respiratoryRate: {
    timeSeries: [],
    average: 0,
    confidence: 0,
    unit: "br/min",
    note: "Waiting for data..."
  }
};