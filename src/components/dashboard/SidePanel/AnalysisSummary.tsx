import { Card } from "@/components/ui/card";
import { Clock, Activity, AlertTriangle, Calendar } from "lucide-react";

const summaryItems = [
  { icon: Clock, label: 'Session Duration', value: '5:23' },
  { icon: Activity, label: 'Avg Heart Rate', value: '72 BPM' },
  { icon: AlertTriangle, label: 'Symptoms Detected', value: '3' },
  { icon: Calendar, label: 'Follow-up', value: '3 days' },
];

export function AnalysisSummary() {
  return (
    <Card className="p-4 bg-white/10 backdrop-blur border-none">
      <h3 className="text-sm font-medium text-white mb-4">Analysis Summary</h3>
      <div className="space-y-3">
        {summaryItems.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5">
            <div className="flex items-center gap-2 text-white/70">
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}