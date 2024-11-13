import { Info, ShieldAlert } from "lucide-react";
import React, { useState } from "react";

export default function Guidelines() {
  const [showGuide, setShowGuide] = useState(true);
  
  if (!showGuide) return null;
  
  return (
    <div className="col-span-12 space-y-3">
      
      <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100 shadow-sm">
        <div className="flex gap-2 items-center">
          <ShieldAlert className="h-4 w-4 text-amber-600" />
          <h2 className="text-amber-950 font-medium">Important Disclaimer</h2>
        </div>
        <p className="mt-2 text-amber-900 text-sm leading-relaxed">
          This tool is for demonstration purposes only and should not be used for medical diagnosis. 
          The measurements provided are estimates and may not be accurate. Always consult healthcare 
          professionals for medical advice and use FDA-approved devices for accurate vital sign monitoring.
        </p>
      </div>
      <div className="bg-white/80 rounded-xl p-4 border border-sky-100 shadow-sm">
        <div className="flex gap-2 items-center">
          <Info className="h-4 w-4 text-sky-600" />
          <h2 className="text-sky-950 font-medium">Best Practices for Accurate Measurements</h2>
        </div>
        <ul className="mt-3 space-y-2 text-sky-900">
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