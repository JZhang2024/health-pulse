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
    <Card className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sky-950">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs ${
          metric.confidence > 0.8 
            ? 'bg-green-100 text-green-800' 
            : metric.confidence > 0.6 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-red-100 text-red-800'
        } font-medium`}>
          {(metric.confidence * 100).toFixed(0)}% confident
        </span>
      </div>
      <VitalsChart 
        data={metric.timeSeries}
        unit={metric.unit}
        type={type}
        average={metric.average}
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sky-950">
          Average: <span className="font-medium">
            {metric.average.toFixed(1)} {metric.unit}
          </span>
        </div>
        <div className="text-sm text-sky-700">{note}</div>
      </div>
    </Card>
  );
}