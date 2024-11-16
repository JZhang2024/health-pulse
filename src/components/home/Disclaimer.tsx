import { ShieldAlert } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="bg-amber-50/80 rounded-xl p-4 sm:p-6 border border-amber-100 shadow-sm max-w-3xl mx-auto">
      <div className="flex gap-2 items-start sm:items-center mb-3 sm:mb-4">
        <ShieldAlert className="h-4 sm:h-5 w-4 sm:w-5 text-amber-600 mt-1 sm:mt-0" />
        <h3 className="text-base sm:text-lg font-semibold text-amber-950">Important Medical Disclaimer</h3>
      </div>
      <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
        This platform is designed for educational and monitoring purposes only. The measurements 
        and insights provided should not be used for medical diagnosis or treatment decisions. 
        Always consult healthcare professionals for medical advice and use FDA-approved devices 
        for clinical vital sign monitoring.
      </p>
    </div>
  );
}