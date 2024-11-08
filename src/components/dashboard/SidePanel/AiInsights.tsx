import { Card } from "@/components/ui/card";

const insights = [
  "Elevated heart rate during symptom description",
  "Speech pattern indicates mild respiratory stress",
  "Recommended follow-up: Pulmonary function test"
];

export function AIInsights() {
  return (
    <Card className="p-4 bg-white/10 backdrop-blur border-none">
      <h3 className="text-sm font-medium text-white mb-4">AI Insights</h3>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <div key={i} className="p-2 rounded bg-white/5 text-white/70 text-sm">
            {insight}
          </div>
        ))}
      </div>
    </Card>
  );
}