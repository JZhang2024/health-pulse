interface ConfidenceBadgeProps {
    confidence: number;
  }
  
  export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
    const getConfidenceColor = (conf: number) => {
      if (conf > 0.8) return "bg-green-100 text-green-800";
      if (conf > 0.6) return "bg-yellow-100 text-yellow-800";
      return "bg-red-100 text-red-800";
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(confidence)}`}>
        {(confidence * 100).toFixed(0)}% confident
      </span>
    );
  }