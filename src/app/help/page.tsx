import { Navigation } from '@/components/ui/Navigation';
import { AlertCircle, Camera, Activity, Bot } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-4 sm:space-y-6">
          {/* Getting Started */}
          <div className="bg-white/80 backdrop-blur rounded-xl p-4 sm:p-8 border border-sky-100 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-sky-950 mb-3 sm:mb-6">Help Center</h1>
            <h2 className="text-lg sm:text-xl font-semibold text-sky-950 mb-3 sm:mb-4">Getting Started</h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-sky-900">
              <p>
                HealthPulse provides contactless vital sign monitoring using your device&apos;s camera. 
                Here&apos;s how to get the best results:
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 pl-4">
                <li>Use a device with a good quality webcam</li>
                <li>Ensure good lighting on your face</li>
                <li>Sit still during the recording</li>
                <li>Position your face clearly in the frame</li>
                <li>Record for at least 15 seconds for accurate results</li>
              </ul>
            </div>
          </div>

          {/* Features Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 sm:p-6 border border-sky-100 shadow-sm">
              <div className="flex items-start sm:items-center gap-2 mb-3 sm:mb-4">
                <Camera className="w-4 sm:w-5 h-4 sm:h-5 text-sky-600 mt-1 sm:mt-0" />
                <h3 className="text-base sm:text-lg font-semibold text-sky-950">Recording Vitals</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-sky-900">
                <li>1. Click &quot;Start Recording&quot; on the dashboard</li>
                <li>2. Stay still while the camera records</li>
                <li>3. Wait for automatic stop after 30 seconds</li>
                <li>4. View your results in real-time</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-4 sm:p-6 border border-sky-100 shadow-sm">
              <div className="flex items-start sm:items-center gap-2 mb-3 sm:mb-4">
                <Activity className="w-4 sm:w-5 h-4 sm:h-5 text-sky-600 mt-1 sm:mt-0" />
                <h3 className="text-base sm:text-lg font-semibold text-sky-950">Understanding Results</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-sky-900">
                <li>Heart Rate: Measured in beats per minute (bpm)</li>
                <li>Respiratory Rate: Measured in breaths per minute (br/min)</li>
                <li>Confidence scores indicate measurement reliability</li>
                <li>View trends in real-time graphs</li>
              </ul>
            </div>
          </div>

          {/* Health Assistant Guide */}
          <div className="bg-white/80 backdrop-blur rounded-xl p-4 sm:p-6 border border-sky-100 shadow-sm">
            <div className="flex items-start sm:items-center gap-2 mb-3 sm:mb-4">
              <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-sky-600 mt-1 sm:mt-0" />
              <h3 className="text-base sm:text-lg font-semibold text-sky-950">Using the Health Assistant</h3>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-sky-900">
              <p>
                The AI Health Assistant can help you understand your vital signs and provide 
                general health information. You can:
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 pl-4">
                <li>Ask questions about your measurements</li>
                <li>Get general health information</li>
                <li>Understand what your results mean</li>
                <li>Learn about healthy vital sign ranges</li>
              </ul>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="bg-white/80 backdrop-blur rounded-xl p-4 sm:p-6 border border-sky-100 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-sky-950 mb-3 sm:mb-4">Technical Requirements</h3>
            <ul className="space-y-2 text-sm sm:text-base text-sky-900">
              <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>• Webcam access</li>
              <li>• Stable internet connection</li>
              <li>• Well-lit environment</li>
            </ul>
          </div>

          {/* Support Note */}
          <div className="bg-sky-50 rounded-xl p-4 sm:p-6 border border-sky-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-sky-600 mt-1 sm:mt-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-sky-950 mb-2">Note</h3>
                <p className="text-xs sm:text-sm text-sky-900">
                  This is a learning project showcasing the integration of various technologies. 
                  While we strive for accuracy, the measurements should not be used for medical 
                  purposes. For any health concerns, please consult healthcare professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
