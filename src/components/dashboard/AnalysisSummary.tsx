import { Card } from "@/components/ui/card";
import { getVitalSignNote } from "../vitals/VitalMetricCard";
import { AnalysisSummaryProps } from "@/types/components";

export function AnalysisSummary({ vitalsData }: AnalysisSummaryProps) {
    const { heartRate, respiratoryRate } = vitalsData;
    const heartRateNote = getVitalSignNote('heartRate', heartRate.average, heartRate.confidence);
    const respiratoryRateNote = getVitalSignNote('respiratoryRate', respiratoryRate.average, respiratoryRate.confidence);

    return (
        <Card className="bg-white/80 backdrop-blur rounded-xl p-6 border border-sky-100 shadow-sm">
            <h3 className="text-lg font-semibold text-sky-950 mb-4">Analysis Summary</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
                        <div className="text-sm text-sky-700 mb-1">Heart Rate Status</div>
                        <div className="text-2xl font-semibold text-sky-950">
                            {heartRate.average.toFixed(1)}
                            <span className="text-sm text-sky-600 ml-1">{heartRate.unit}</span>
                        </div>
                        <div className="mt-1 text-sm text-sky-700">
                            Confidence: {(heartRate.confidence * 100).toFixed(0)}%
                        </div>
                    </div>
                    <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
                        <div className="text-sm text-sky-700 mb-1">Respiratory Rate Status</div>
                        <div className="text-2xl font-semibold text-sky-950">
                            {respiratoryRate.average.toFixed(1)}
                            <span className="text-sm text-sky-600 ml-1">{respiratoryRate.unit}</span>
                        </div>
                        <div className="mt-1 text-sm text-sky-700">
                            Confidence: {(respiratoryRate.confidence * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>
                <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
                    <div className="text-sm font-medium text-sky-950 mb-2">Analysis Notes</div>
                    <div className="space-y-2 text-sm text-sky-700">
                        <div className="flex gap-2">
                            <span className="text-sky-400">•</span>
                            <span>{heartRateNote}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-sky-400">•</span>
                            <span>{respiratoryRateNote}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
