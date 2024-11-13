import { ShieldAlert } from 'lucide-react';

export function Disclaimer() {
  return (
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
  );
}