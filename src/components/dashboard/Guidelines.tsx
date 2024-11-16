import { Info, ShieldAlert } from "lucide-react";

export default function Guidelines() {
  
  return (
    <div className="col-span-12 space-y-3">
      <div className="bg-amber-50/80 rounded-xl p-3 sm:p-4 border border-amber-100 shadow-sm">
        <div className="flex gap-2 items-start sm:items-center">
          <ShieldAlert className="h-4 w-4 text-amber-600 mt-1 sm:mt-0" />
          <h2 className="text-base sm:text-lg font-medium text-amber-950">Important Disclaimer</h2>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
          This tool is for demonstration purposes only and should not be used for medical diagnosis. 
          The measurements provided are estimates and may not be accurate. Always consult healthcare 
          professionals for medical advice and use FDA-approved devices for accurate vital sign monitoring.
        </p>
      </div>
      
      <div className="bg-white/80 rounded-xl p-3 sm:p-4 border border-sky-100 shadow-sm">
        <div className="flex gap-2 items-start sm:items-center">
          <Info className="h-4 w-4 text-sky-600 mt-1 sm:mt-0" />
          <h2 className="text-base sm:text-lg font-medium text-sky-950">Best Practices for Accurate Measurements</h2>
        </div>
        <ul className="mt-3 space-y-2 text-xs sm:text-sm text-sky-900">
          <li>• Sit still and face the camera directly during recording</li>
          <li>• Ensure your face is well-lit and clearly visible</li>
          <li>• Record for at least 15 seconds for best results</li>
          <li>• Avoid moving or talking during the measurement</li>
          <li>• Take multiple readings for more reliable results</li>
        </ul>
      </div>
    </div>
  );
}