import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ShieldAlert } from "lucide-react";
import React, { useState } from "react";

export default function VitalMeasurementGuide() {
  const [showGuide, setShowGuide] = useState(true);
  
  if (!showGuide) return null;
  
  return (
    <div className="lg:col-span-12 space-y-4">
          <div className="bg-white/10 border border-indigo-500/50 rounded-lg p-4">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-indigo-500" />
              <h2 className="font-semibold text-white">Best Practices for Accurate Measurements</h2>
            </div>
            <ul className="mt-2 space-y-1 list-disc list-inside text-white/80">
              <li>Sit still and face the camera directly during recording</li>
              <li>Ensure your face is well-lit and clearly visible</li>
              <li>Record for at least 15 seconds for best results</li>
              <li>Avoid moving or talking during the measurement</li>
              <li>Take multiple readings for more reliable results</li>
            </ul>
          </div>
          
          <div className="bg-white/10 border border-amber-500/50 rounded-lg p-4">
            <div className="flex gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-white">Important Disclaimer</h2>
            </div>
            <p className="mt-2 text-white/80">
              This tool is for demonstration purposes only and should not be used for medical diagnosis. 
              The measurements provided are estimates and may not be accurate. Always consult healthcare 
              professionals for medical advice and use FDA-approved devices for accurate vital sign monitoring.
            </p>
          </div>
        </div>
  );
}