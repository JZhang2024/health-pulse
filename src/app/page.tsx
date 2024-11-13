import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { TechnicalDetails } from '@/components/home/TechnicalDetails';
import { Disclaimer } from '@/components/home/Disclaimer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Navigation />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <Features />
        <div className="mt-24">
          <TechnicalDetails />
        </div>
        <div className="mt-24">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}