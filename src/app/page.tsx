// app/page.tsx
import { Heart, Activity, Brain, Webcam } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const HomePage = () => {
  const features = [
    {
      title: "Real-time Heart Rate",
      description: "Monitor heart rate with medical-grade accuracy using just your camera",
      icon: Heart,
      color: "text-red-500"
    },
    {
      title: "Respiratory Analysis",
      description: "Track breathing patterns and respiratory rate through video processing",
      icon: Activity,
      color: "text-indigo-500"
    },
    {
      title: "AI-Powered Analysis",
      description: "Advanced algorithms provide instant vital sign measurements",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      title: "Non-contact Monitoring",
      description: "Get accurate readings without any physical contact or sensors",
      icon: Webcam,
      color: "text-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      {/* Hero Section */}
      <div className="bg-white/10 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Remote Vital Signs Monitoring
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Advanced computer vision technology that transforms your camera into a 
              powerful vital signs monitor. Get accurate heart rate and respiratory 
              measurements in real-time.
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg transition-colors backdrop-blur border border-white/20 font-medium gap-2"
            >
              <Activity className="w-5 h-5" />
              Start Monitoring
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur border-none hover:bg-white/[0.15] transition-colors">
              <CardHeader>
                <feature.icon className={`w-10 h-10 ${feature.color} mb-2 opacity-90`} />
                <CardTitle className="text-xl font-semibold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Details Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto mb-12">
            Our system uses advanced computer vision and photoplethysmography (PPG) 
            technology to detect subtle color changes in your skin that indicate blood 
            flow and breathing patterns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <div className="text-4xl font-bold text-white mb-2">30 FPS</div>
              <div className="text-white/70">Video Processing</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <div className="text-4xl font-bold text-white mb-2">&lt;1s</div>
              <div className="text-white/70">Response Time</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/70">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;