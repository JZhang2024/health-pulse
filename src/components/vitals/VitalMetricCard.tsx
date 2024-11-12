import { Card } from "@/components/ui/card";
import { ConfidenceBadge } from './ConfidenceBadge';
import { VitalsChart } from './VitalsChart';
import type { VitalMetric, VitalType } from "@/types/vitallens";

interface VitalMetricCardProps {
  title: string;
  metric: VitalMetric;
  type: VitalType;
}

export function getVitalSignNote(type: VitalType, value: number, confidence: number): string {
  const confidenceLevel = confidence >= 0.9 ? "high" : confidence >= 0.7 ? "good" : "moderate";
  
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
    <Card className="p-4 bg-white/10 backdrop-blur border-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <ConfidenceBadge confidence={metric.confidence} />
      </div>
      <VitalsChart 
        data={metric.timeSeries}
        unit={metric.unit}
        type={type}
        average={metric.average}
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="text-white">
          Average: <span className="font-medium">
            {metric.average.toFixed(1)} {metric.unit}
          </span>
        </div>
        <div className="text-sm text-white/70 italic">{note}</div>
      </div>
    </Card>
  );
}