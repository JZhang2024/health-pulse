import { Card } from "@/components/ui/card";
import { VitalsChart } from './VitalsChart';
import { ConfidenceBadge } from "./ConfidenceBadge";
import type { VitalMetricCardProps } from "@/types/vitallens";
import type { VitalType } from "@/types/vitallens";


export function getVitalSignNote(type: VitalType, value: number, confidence: number): string {
  const confidenceLevel = confidence >= 0.9 ? "high" : confidence >= 0.7 ? "good" : confidence >= 0.5 ? "moderate" : "low";
  
  if (type === 'heartRate') {
    if (value < 60) return `Resting heart rate is below normal range (<60 bpm). Confidence is ${confidenceLevel}.`;
    if (value > 100) return `Heart rate is elevated (>100 bpm). Measurement confidence is ${confidenceLevel}.`;
    return `Heart rate is within normal resting range (60-100 bpm). Confidence is ${confidenceLevel}.`;
  } else {
    if (value < 12) return `Respiratory rate is below normal range (<12 br/min). Confidence is ${confidenceLevel}.`;
    if (value > 20) return `Respiratory rate is elevated (>20 br/min). Measurement confidence is ${confidenceLevel}.`;
    return `Respiratory rate is within normal range (12-20 br/min). Confidence is ${confidenceLevel}.`;
  }
}

export function VitalMetricCard({ title, metric, type }: VitalMetricCardProps) {
  const note = getVitalSignNote(type, metric.average, metric.confidence);
  
  return (
    <Card className="bg-sky-50/50 rounded-xl p-3 sm:p-4 border border-sky-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-sky-950">{title}</h3>
        <ConfidenceBadge confidence={metric.confidence} />
      </div>
      <VitalsChart 
        data={metric.timeSeries}
        unit={metric.unit}
        type={type}
        average={metric.average}
      />
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div className="text-sky-950">
          Average: <span className="font-medium">
            {metric.average.toFixed(1)} {metric.unit}
          </span>
        </div>
        <div className="text-xs sm:text-sm text-sky-700">{note}</div>
      </div>
    </Card>
  );
}