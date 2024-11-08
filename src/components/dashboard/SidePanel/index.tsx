import { AnalysisSummary } from "./AnalysisSummary";
import { AIInsights } from "./AiInsights";

export function SidePanel() {
  return (
    <div className="lg:col-span-4 space-y-4">
      <AnalysisSummary />
      <AIInsights />
    </div>
  );
}