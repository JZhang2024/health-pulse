import { Heart, Activity, Bot, Webcam } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: "Real-time Vitals",
    description: "Monitor heart rate and breathing with medical-grade accuracy using your webcam",
    icon: Heart,
    color: "text-sky-600"
  },
  {
    title: "Instant Analysis",
    description: "Get immediate insights about your vital signs and health metrics",
    icon: Activity,
    color: "text-sky-600"
  },
  {
    title: "AI Health Assistant",
    description: "Receive personalized health guidance and answers to your questions",
    icon: Bot,
    color: "text-sky-600"
  },
  {
    title: "Contactless Technology",
    description: "Advanced computer vision eliminates the need for physical sensors",
    icon: Webcam,
    color: "text-sky-600"
  }
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-white/80 backdrop-blur border border-sky-100 shadow-sm hover:bg-sky-50 transition-colors"
        >
          <CardHeader>
            <feature.icon className={`w-10 h-10 ${feature.color} mb-2`} />
            <CardTitle className="text-xl font-semibold text-sky-950">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sky-700 text-base">
              {feature.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}