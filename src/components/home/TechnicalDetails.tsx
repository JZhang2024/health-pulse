export function TechnicalDetails() {
  return (
    <div className="text-center px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-sky-950 mb-3 sm:mb-4">
        Advanced Technology Made Simple
      </h2>
      <p className="text-sm sm:text-base text-sky-700 max-w-3xl mx-auto mb-8 sm:mb-12">
        Our platform combines cutting-edge computer vision with AI-powered health insights 
        to provide a comprehensive telehealth experience. No special equipment needed - 
        just your device&apos;s camera.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white/80 rounded-lg p-4 sm:p-6 backdrop-blur border border-sky-100 shadow-sm">
          <div className="text-2xl sm:text-4xl font-bold text-sky-600 mb-2">30 FPS</div>
          <div className="text-sm sm:text-base text-sky-700">Real-time Analysis</div>
        </div>
        <div className="bg-white/80 rounded-lg p-4 sm:p-6 backdrop-blur border border-sky-100 shadow-sm">
          <div className="text-2xl sm:text-4xl font-bold text-sky-600 mb-2">&lt;30s</div>
          <div className="text-sm sm:text-base text-sky-700">Quick Results</div>
        </div>
        <div className="bg-white/80 rounded-lg p-4 sm:p-6 backdrop-blur border border-sky-100 shadow-sm">
          <div className="text-2xl sm:text-4xl font-bold text-sky-600 mb-2">24/7</div>
          <div className="text-sm sm:text-base text-sky-700">AI Assistance</div>
        </div>
      </div>
    </div>
  );
}