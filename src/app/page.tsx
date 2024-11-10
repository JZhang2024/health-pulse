import { Calendar, Video, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const HomePage = () => {
  const features = [
    {
      title: "Virtual Consultations",
      description: "Connect with healthcare providers through secure video calls",
      icon: Video
    },
    {
      title: "Schedule Appointments",
      description: "Book and manage your medical appointments online",
      icon: Calendar
    },
    {
      title: "Secure Messaging",
      description: "Communicate safely with your healthcare team",
      icon: MessageSquare
    },
    {
      title: "24/7 Availability",
      description: "Access healthcare services any time, anywhere",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare at Your Fingertips
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with trusted healthcare providers from the comfort of your home
            </p>
            <Link 
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;