import { Heart, Activity, Brain, Webcam, Bot, Info, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const HomePage = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                  <span className="text-white font-semibold">H</span>
                </div>
                <span className="text-sky-950 font-semibold text-lg">HealthPulse</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/about" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                About
              </Link>
              <Link href="/help" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                Help
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-sky-950 mb-6">
              Your Virtual Health Monitor & Assistant
            </h1>
            <p className="text-xl text-sky-700 mb-8 max-w-2xl mx-auto">
              Experience the future of telehealth with AI-powered vital sign monitoring 
              and personalized health guidance, all from your browser.
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg transition-colors shadow-sm font-medium gap-2"
            >
              <Activity className="w-5 h-5" />
              Try It Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur border border-sky-100 shadow-sm hover:bg-sky-50 transition-colors">
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

        {/* Technical Details Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-sky-950 mb-4">
            Advanced Technology Made Simple
          </h2>
          <p className="text-sky-700 max-w-3xl mx-auto mb-12">
            Our platform combines cutting-edge computer vision with AI-powered health insights 
            to provide a comprehensive telehealth experience. No special equipment needed - 
            just your device's camera.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 rounded-lg p-6 backdrop-blur border border-sky-100 shadow-sm">
              <div className="text-4xl font-bold text-sky-600 mb-2">30 FPS</div>
              <div className="text-sky-700">Real-time Analysis</div>
            </div>
            <div className="bg-white/80 rounded-lg p-6 backdrop-blur border border-sky-100 shadow-sm">
              <div className="text-4xl font-bold text-sky-600 mb-2">&lt;5s</div>
              <div className="text-sky-700">Quick Results</div>
            </div>
            <div className="bg-white/80 rounded-lg p-6 backdrop-blur border border-sky-100 shadow-sm">
              <div className="text-4xl font-bold text-sky-600 mb-2">24/7</div>
              <div className="text-sky-700">AI Assistance</div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-24">
          <div className="bg-amber-50/80 rounded-xl p-6 border border-amber-100 shadow-sm max-w-3xl mx-auto">
            <div className="flex gap-2 items-center mb-4">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-amber-950">Important Medical Disclaimer</h3>
            </div>
            <p className="text-amber-900 text-sm leading-relaxed">
              This platform is designed for educational and monitoring purposes only. The measurements 
              and insights provided should not be used for medical diagnosis or treatment decisions. 
              Always consult healthcare professionals for medical advice and use FDA-approved devices 
              for clinical vital sign monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;