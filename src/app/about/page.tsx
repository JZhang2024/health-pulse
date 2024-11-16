import { Navigation } from '@/components/ui/Navigation';
import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 sm:p-8 border border-sky-100 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-sky-950 mb-4 sm:mb-6">About HealthPulse</h1>
          
          <div className="prose prose-sky max-w-none">
            <p className="text-sm sm:text-base text-sky-900 mb-4 sm:mb-6">
              HealthPulse is a personal project developed to explore modern web technologies 
              and their applications in healthcare. It demonstrates the potential of combining 
              computer vision, machine learning, and large language models to create innovative 
              healthcare solutions.
            </p>

            <h2 className="text-lg sm:text-xl font-semibold text-sky-950 mt-6 sm:mt-8 mb-3 sm:mb-4">Project Goals</h2>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-sky-900 mb-4 sm:mb-6">
              <li>Learn and implement Next.js 15 with React</li>
              <li>Explore computer vision applications in healthcare</li>
              <li>Integrate AI-powered health assistance</li>
              <li>Create an intuitive, accessible user interface</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-semibold text-sky-950 mt-6 sm:mt-8 mb-3 sm:mb-4">Technology Stack</h2>
            <div className="bg-sky-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-sky-900">
                <li><span className="font-semibold">Frontend:</span> Next.js 15, React, TailwindCSS, shadcn/ui</li>
                <li><span className="font-semibold">Backend:</span> Next.js/Node, AWS Services, Vercel</li>
                <li><span className="font-semibold">Vital Signs Detection:</span> VitalLens API from Roust Labs</li>
                <li><span className="font-semibold">Health Assistant:</span> LLM Integration with OpenAI/xAI APIs</li>
              </ul>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-sky-950 mt-6 sm:mt-8 mb-3 sm:mb-4">Acknowledgments</h2>
            <p className="text-sm sm:text-base text-sky-900 mb-3 sm:mb-4">
              This project utilizes the VitalLens API from Roust Labs for vital signs detection. 
              VitalLens employs advanced computer vision techniques to extract vital signs from video data 
              using photoplethysmography (PPG).
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link 
                href="https://www.rouast.com/api/" 
                target="_blank"
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-sky-600 
                         hover:text-sky-700 bg-white/80 rounded-lg px-4 py-2 border border-sky-100"
              >
                <Globe className="w-4 h-4" />
                VitalLens API
              </Link>
              <Link 
                href="https://github.com/JZhang2024/health-pulse" 
                target="_blank"
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-sky-600 
                         hover:text-sky-700 bg-white/80 rounded-lg px-4 py-2 border border-sky-100"
              >
                <Github className="w-4 h-4" />
                Project Repository
              </Link>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-amber-900">
                Note: This is a learning project and should not be used for medical diagnosis 
                or treatment decisions. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}