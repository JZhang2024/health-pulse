import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VitalsChartProps } from '@/types/vitallens';
import { useEffect, useState } from 'react';

export function VitalsChart({ data, unit, type }: VitalsChartProps) {
    const isHeartRate = type === 'heartRate';
    const [chartHeight, setChartHeight] = useState(180);
    const [fontSize, setFontSize] = useState('12px');
    
    useEffect(() => {
        const updateDimensions = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth < 640) { // sm breakpoint
                    setChartHeight(120);
                    setFontSize('10px');
                } else {
                    setChartHeight(180);
                    setFontSize('12px');
                }
            }
        };

        // Set initial dimensions
        updateDimensions();

        // Add resize listener
        window.addEventListener('resize', updateDimensions);

        // Cleanup
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    
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
        <div className="w-full">
            <ResponsiveContainer width="100%" height={chartHeight}>
                <LineChart
                    data={data}
                    margin={{ 
                        top: 5,
                        right: 5,
                        left: 0,  // Reduced left margin
                        bottom: 15 
                    }}
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
                        tick={{ 
                            fill: '#0c4a6e',
                            fontSize: fontSize
                        }}
                        label={{ 
                            value: 'Time (s)', 
                            position: 'bottom',
                            fill: '#0c4a6e',
                            fontSize: fontSize,
                            offset: 5
                        }}
                        tickCount={5}  // Limit ticks on mobile
                        minTickGap={15}  // Prevent overlapping
                    />
                    <YAxis 
                        domain={getDomain()}
                        stroke="#0c4a6e"
                        tick={{ 
                            fill: '#0c4a6e',
                            fontSize: fontSize
                        }}
                        label={{ 
                            value: unit, 
                            angle: -90, 
                            position: 'insideLeft',
                            fill: '#0c4a6e',
                            fontSize: fontSize,
                            offset: 0,
                            style: { textAnchor: 'middle' }
                        }}
                        width={30}  // Fixed width to prevent cutoff
                        tickCount={5}  // Limit ticks on mobile
                    />
                    <Tooltip 
                        content={({ payload, label }) => {
                            if (!payload?.length) return null;
                            const { value, confidence } = payload[0].payload;
                            return (
                                <div className="bg-white border border-sky-100 shadow-lg p-2 rounded-lg">
                                    <div className="text-xs text-sky-950">
                                        <div>Time: {Number(label).toFixed(1)}s</div>
                                        <div>Value: {value.toFixed(1)} {unit}</div>
                                        <div>Confidence: {(confidence * 100).toFixed(0)}%</div>
                                    </div>
                                </div>
                            );
                        }}
                        cursor={{ stroke: '#0369a1', strokeWidth: 1 }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="value"
                        stroke={isHeartRate ? "#0369a1" : "#1d4ed8"}
                        strokeWidth={1.5}
                        dot={false}
                        animationDuration={500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}