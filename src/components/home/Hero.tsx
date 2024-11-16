import { Activity } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="bg-white/50 backdrop-blur-sm border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-950 mb-4 sm:mb-6">
            Your Virtual Health Monitor & Assistant
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-sky-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            Experience the future of telehealth with AI-powered vital sign monitoring 
            and personalized health guidance, all from your browser.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white 
                     px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors shadow-sm 
                     font-medium gap-2 text-sm sm:text-base"
          >
            <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
            Try It Now
          </Link>
        </div>
      </div>
    </div>
  );
}