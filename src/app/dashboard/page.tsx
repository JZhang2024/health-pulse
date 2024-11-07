'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  Activity, Camera, Mic, 
  Calendar, Clock, AlertTriangle 
} from "lucide-react";

const VitalsMonitor = () => {
  // Simulated real-time data
  const [vitals, setVitals] = useState({
    heartRate: Array.from({length: 20}, () => ({
      time: new Date(),
      value: Math.floor(Math.random() * 20) + 70
    }))
  });

  // Simulate updating vitals
  React.useEffect(() => {
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
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={vitals.heartRate}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tick={false}
          />
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
  );
};

const SymptomMap = () => {
  const [symptoms] = useState([
    { time: '1d', severity: 30 },
    { time: '2d', severity: 45 },
    { time: '3d', severity: 65 },
    { time: '4d', severity: 55 },
    { time: '5d', severity: 40 },
  ]);

  return (
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
  );
};

const HealthApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('vitals');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Analysis Panel */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-6 bg-white/10 backdrop-blur border-none">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Real-time Analysis</h2>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`bg-white/10 hover:bg-white/20 text-white ${isRecording ? 'animate-pulse ring-2 ring-red-500' : ''}`}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {isRecording ? 'Recording...' : 'Start Analysis'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Input
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card className="bg-white/10 backdrop-blur p-4">
                <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Heart Rate Monitor
                </h3>
                <VitalsMonitor />
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Symptom Intensity
                </h3>
                <SymptomMap />
              </Card>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
              <div className="relative bg-white/10 backdrop-blur rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-white/70 text-center">
                  <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  {isRecording ? (
                    <div className="space-y-2">
                      <div className="text-sm">Analyzing video feed...</div>
                      <div className="flex justify-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm">Start video analysis for visual symptom detection</div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-4 bg-white/10 backdrop-blur border-none">
            <h3 className="text-sm font-medium text-white mb-4">Analysis Summary</h3>
            <div className="space-y-3">
              {[
                { icon: Clock, label: 'Session Duration', value: '5:23' },
                { icon: Activity, label: 'Avg Heart Rate', value: '72 BPM' },
                { icon: AlertTriangle, label: 'Symptoms Detected', value: '3' },
                { icon: Calendar, label: 'Follow-up', value: '3 days' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5">
                  <div className="flex items-center gap-2 text-white/70">
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur border-none">
            <h3 className="text-sm font-medium text-white mb-4">AI Insights</h3>
            <div className="space-y-2">
              {[
                "Elevated heart rate during symptom description",
                "Speech pattern indicates mild respiratory stress",
                "Recommended follow-up: Pulmonary function test"
              ].map((insight, i) => (
                <div key={i} className="p-2 rounded bg-white/5 text-white/70 text-sm">
                  {insight}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthApp;