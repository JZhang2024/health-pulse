export function TechnicalDetails() {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-sky-950 mb-4">
          Advanced Technology Made Simple
        </h2>
        <p className="text-sky-700 max-w-3xl mx-auto mb-12">
          Our platform combines cutting-edge computer vision with AI-powered health insights 
          to provide a comprehensive telehealth experience. No special equipment needed - 
          just your device's camera.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 rounded-lg p-6 backdrop-blur border border-sky-100 shadow-sm">
            <div className="text-4xl font-bold text-sky-600 mb-2">30 FPS</div>
            <div className="text-sky-700">Real-time Analysis</div>
          </div>
          <div className="bg-white/80 rounded-lg p-6 backdrop-blur border border-sky-100 shadow-sm">
            <div className="text-4xl font-bold text-sky-600 mb-2">&lt;1s</div>
            <div className="text-sky-700">Instant Results</div>
          </div>
          <div className="bg-white/80 rounded-lg p-6 backdrop-blur border border-sky-100 shadow-sm">
            <div className="text-4xl font-bold text-sky-600 mb-2">24/7</div>
            <div className="text-sky-700">AI Assistance</div>
          </div>
        </div>
      </div>
    );
  }