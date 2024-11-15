import { ConfidenceBadgeProps } from "@/types/components";

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.9) return "bg-green-100 text-green-800";
    if (conf >= 0.7) return "bg-yellow-100 text-yellow-800";
    if (conf >= 0.5) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${getConfidenceColor(confidence)}`}>
      {(confidence * 100).toFixed(0)}% confident
    </span>
  );
}