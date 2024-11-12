import { Card } from "@/components/ui/card";
import type { VitalsData } from "@/types/vitallens";
import { getVitalSignNote } from "../vitals/VitalMetricCard";

interface AnalysisSummaryProps {
    vitalsData: VitalsData;
}

export function AnalysisSummary({ vitalsData }: AnalysisSummaryProps) {
    const { heartRate, respiratoryRate } = vitalsData;
    const heartRateNote = getVitalSignNote('heartRate', heartRate.average, heartRate.confidence);
    const respiratoryRateNote = getVitalSignNote('respiratoryRate', respiratoryRate.average, respiratoryRate.confidence);

    return (
        <Card className="p-6 bg-white/10 backdrop-blur border-none">
            <h3 className="text-lg font-semibold text-white mb-4">Analysis Summary</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-sm text-white/70 mb-1">Heart Rate Status</div>
                        <div className="text-2xl font-semibold text-white">
                            {heartRate.average.toFixed(1)}
                            <span className="text-sm text-white/70 ml-1">{heartRate.unit}</span>
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                            Confidence: {(heartRate.confidence * 100).toFixed(0)}%
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-sm text-white/70 mb-1">Respiratory Rate Status</div>
                        <div className="text-2xl font-semibold text-white">
                            {respiratoryRate.average.toFixed(1)}
                            <span className="text-sm text-white/70 ml-1">{respiratoryRate.unit}</span>
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                            Confidence: {(respiratoryRate.confidence * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm font-medium text-white mb-2">Analysis Notes</div>
                    <div className="space-y-2 text-sm text-white/70">
                        <div>• {heartRateNote}</div>
                        <div>• {respiratoryRateNote}</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}