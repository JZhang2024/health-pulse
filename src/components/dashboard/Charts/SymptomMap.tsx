import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

export function SymptomMap() {
  const [symptoms] = useState([
    { time: '1d', severity: 30 },
    { time: '2d', severity: 45 },
    { time: '3d', severity: 65 },
    { time: '4d', severity: 55 },
    { time: '5d', severity: 40 },
  ]);

  return (
    <Card className="bg-white/10 backdrop-blur p-4">
      <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Symptom Intensity
      </h3>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={symptoms}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="severity" 
              stroke="#6366f1" 
              fill="#6366f1" 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}