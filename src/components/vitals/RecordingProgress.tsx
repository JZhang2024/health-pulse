interface RecordingProgressProps {
    duration: number;
    maxDuration: number;
}

export function RecordingProgress({ duration, maxDuration }: RecordingProgressProps) {
    const progress = (duration / maxDuration) * 100;

    return (
        <div className="w-full">
            <div className="flex justify-between text-sm text-white/70 mb-1">
                <span>{duration}s</span>
                <span>{maxDuration}s</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-red-500 transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}