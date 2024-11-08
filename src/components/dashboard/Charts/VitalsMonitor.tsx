import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

export function VitalsMonitor() {
  const [vitals, setVitals] = useState({
    heartRate: Array.from({length: 20}, () => ({
      time: new Date(),
      value: Math.floor(Math.random() * 20) + 70
    }))
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: [
          ...prev.heartRate.slice(1),
          {
            time: new Date(),
            value: Math.floor(Math.random() * 20) + 70
          }
        ]
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white/10 backdrop-blur p-4">
      <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
        <Activity className="h-4 w-4" />
        Heart Rate Monitor
      </h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={vitals.heartRate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={false} />
            <YAxis domain={[40, 120]} />
            <Tooltip 
              formatter={(value) => [`${value} BPM`, 'Heart Rate']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}