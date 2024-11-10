import { Card } from "@/components/ui/card";
import { ConfidenceBadge } from './ConfidenceBadge';
import { VitalsChart } from './VitalsChart';
import type { VitalMetric, VitalType } from "@/types/vitallens";

interface VitalMetricCardProps {
  title: string;
  metric: VitalMetric;
  type: VitalType;
}

export function VitalMetricCard({ title, metric, type }: VitalMetricCardProps) {
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
      />
      <div className="mt-4 flex justify-between items-center text-white/70">
        <div>
          Average: <span className="text-white font-medium">
            {metric.average.toFixed(1)} {metric.unit}
          </span>
        </div>
        <div className="text-sm italic">{metric.note}</div>
      </div>
    </Card>
  );
}