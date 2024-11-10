import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer 
  } from 'recharts';
  import type { VitalType } from "@/types/vitallens";
  
  interface VitalsChartProps {
    data: Array<{
      time: number;
      value: number;
      confidence: number;
    }>;
    unit: string;
    type: VitalType;
  }
  
  export function VitalsChart({ data, unit, type }: VitalsChartProps) {
    const isHeartRate = type === 'heartRate';
    
    return (
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            label={{ value: 'Time (s)', position: 'bottom' }}
            stroke="rgba(255,255,255,0.5)"
          />
          <YAxis 
            domain={isHeartRate ? [40, 120] : [8, 24]}
            label={{ value: unit, angle: -90, position: 'insideLeft' }}
            stroke="rgba(255,255,255,0.5)"
          />
          <Tooltip 
            content={({ payload, label }) => {
              if (!payload?.length) return null;
              const { value, confidence } = payload[0].payload;
              return (
                <div className="bg-black/80 p-2 rounded-lg text-white text-sm">
                  <div>Time: {Number(label).toFixed(1)}s</div>
                  <div>Value: {value.toFixed(1)} {unit}</div>
                  <div>Confidence: {(confidence * 100).toFixed(0)}%</div>
                </div>
              );
            }}
          />
          <Line 
            type="monotone"
            dataKey="value"
            stroke={isHeartRate ? "#ef4444" : "#6366f1"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }