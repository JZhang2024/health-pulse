import { Navigation } from '@/components/ui/Navigation';
import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white/80 backdrop-blur rounded-xl p-8 border border-sky-100 shadow-sm">
          <h1 className="text-3xl font-bold text-sky-950 mb-6">About HealthPulse</h1>
          
          <div className="prose prose-sky max-w-none">
            <p className="text-sky-900 mb-6">
              HealthPulse is a personal project developed to explore modern web technologies 
              and their applications in healthcare. It demonstrates the potential of combining 
              computer vision, machine learning, and large language models to create innovative 
              healthcare solutions.
            </p>

            <h2 className="text-xl font-semibold text-sky-950 mt-8 mb-4">Project Goals</h2>
            <ul className="list-disc list-inside space-y-2 text-sky-900 mb-6">
              <li>Learn and implement Next.js 15 with React</li>
              <li>Explore computer vision applications in healthcare</li>
              <li>Integrate AI-powered health assistance</li>
              <li>Create an intuitive, accessible user interface</li>
            </ul>

            <h2 className="text-xl font-semibold text-sky-950 mt-8 mb-4">Technology Stack</h2>
            <div className="bg-sky-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3 text-sky-900">
                <li><span className="font-semibold">Frontend:</span> Next.js 15, React, TailwindCSS, shadcn/ui</li>
                <li><span className="font-semibold">Backend: </span> Next.js/Node, AWS Lambda, Vercel</li>
                <li><span className="font-semibold">Vital Signs Detection:</span> VitalLens API from Roust Labs</li>
                <li><span className="font-semibold">Health Assistant:</span> Large Language Model Integration with OpenAI and xAI APIs</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-sky-950 mt-8 mb-4">Acknowledgments</h2>
            <p className="text-sky-900 mb-4">
              This project utilizes the VitalLens API from Roust Labs for vital signs detection. 
              VitalLens employs advanced computer vision techniques to extract vital signs from video data 
              using photoplethysmography (PPG).
            </p>
            <div className="flex gap-4 mb-8">
              <Link 
                href="https://www.rouast.com/api/" 
                target="_blank"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700"
              >
                <Globe className="w-4 h-4" />
                VitalLens API
              </Link>
              <Link 
                href="https://github.com/yourusername/healthpulse" 
                target="_blank"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700"
              >
                <Github className="w-4 h-4" />
                Project Repository
              </Link>
            </div>

            <div className="bg-amber-50 rounded-lg p-6">
              <p className="text-amber-900 text-sm">
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