import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VitalsChartProps } from '@/types/vitallens';

export function VitalsChart({ data, unit, type, average }: VitalsChartProps) {
    const isHeartRate = type === 'heartRate';
    
    const getDomain = () => {
        const values = data.map(d => d.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const padding = isHeartRate ? 10 : 5;
        
        return [
          Math.max(0, Math.floor(min - padding)),
          Math.ceil(max + padding)
        ];
    };
  
    return (
        <ResponsiveContainer width="100%" height={180}>
            <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
            >
                <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="rgba(186, 230, 253, 0.4)"
                    vertical={false}
                />
                <XAxis 
                    dataKey="time" 
                    type="number"
                    domain={[0, 'auto']}
                    tickFormatter={(value) => value.toFixed(1)}
                    stroke="#0c4a6e"
                    tick={{ fill: '#0c4a6e' }}
                    label={{ 
                        value: 'Time (s)', 
                        position: 'bottom',
                        fill: '#0c4a6e',
                        offset: 10
                    }}
                />
                <YAxis 
                    domain={getDomain()}
                    stroke="#0c4a6e"
                    tick={{ fill: '#0c4a6e' }}
                    label={{ 
                        value: unit, 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#0c4a6e',
                        offset: -5,
                        style: { textAnchor: 'middle' }
                    }}
                />
                <Tooltip 
                    content={({ payload, label }) => {
                        if (!payload?.length) return null;
                        const { value, confidence } = payload[0].payload;
                        return (
                            <div className="bg-white border border-sky-100 shadow-lg p-2 rounded-lg text-sky-950 text-sm">
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
                    stroke={isHeartRate ? "#0369a1" : "#1d4ed8"}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={500}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}