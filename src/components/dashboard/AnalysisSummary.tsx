import { Card } from "@/components/ui/card";
import { getVitalSignNote } from "../vitals/VitalMetricCard";
import { useDashboardStore } from "@/stores/useDashboardStore";

export function AnalysisSummary() {
    const { heartRate, respiratoryRate } = useDashboardStore(state => state.vitalsData);
    const heartRateNote = getVitalSignNote('heartRate', heartRate.average, heartRate.confidence);
    const respiratoryRateNote = getVitalSignNote('respiratoryRate', respiratoryRate.average, respiratoryRate.confidence);

    return (
        <Card className="bg-white/80 backdrop-blur rounded-xl p-3 sm:p-6 border border-sky-100 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-sky-950 mb-3 sm:mb-4">
                Analysis Summary
            </h3>
            <div className="space-y-3 sm:space-y-4">
                {/* Metrics Grid - Stack on mobile, side by side on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Heart Rate Card */}
                    <div className="bg-sky-50/50 rounded-xl p-3 sm:p-4 border border-sky-100">
                        <div className="text-xs sm:text-sm text-sky-700 mb-1">Heart Rate Status</div>
                        <div className="flex items-baseline">
                            <div className="text-xl sm:text-2xl font-semibold text-sky-950">
                                {heartRate.average.toFixed(1)}
                            </div>
                            <span className="text-xs sm:text-sm text-sky-600 ml-1">
                                {heartRate.unit}
                            </span>
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-sky-700">
                            Confidence: {(heartRate.confidence * 100).toFixed(0)}%
                        </div>
                    </div>

                    {/* Respiratory Rate Card */}
                    <div className="bg-sky-50/50 rounded-xl p-3 sm:p-4 border border-sky-100">
                        <div className="text-xs sm:text-sm text-sky-700 mb-1">Respiratory Rate Status</div>
                        <div className="flex items-baseline">
                            <div className="text-xl sm:text-2xl font-semibold text-sky-950">
                                {respiratoryRate.average.toFixed(1)}
                            </div>
                            <span className="text-xs sm:text-sm text-sky-600 ml-1">
                                {respiratoryRate.unit}
                            </span>
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-sky-700">
                            Confidence: {(respiratoryRate.confidence * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>

                {/* Analysis Notes Section */}
                <div className="bg-sky-50/50 rounded-xl p-3 sm:p-4 border border-sky-100">
                    <div className="text-sm font-medium text-sky-950 mb-2">Analysis Notes</div>
                    <div className="space-y-2 text-xs sm:text-sm text-sky-700">
                        {/* Heart Rate Note */}
                        <div className="flex gap-2 items-start">
                            <span className="text-sky-400 mt-1">•</span>
                            <span className="flex-1">{heartRateNote}</span>
                        </div>
                        {/* Respiratory Rate Note */}
                        <div className="flex gap-2 items-start">
                            <span className="text-sky-400 mt-1">•</span>
                            <span className="flex-1">{respiratoryRateNote}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
