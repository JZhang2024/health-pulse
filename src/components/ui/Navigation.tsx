import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-3 sm:py-0">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-sky-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm sm:text-base">H</span>
              </div>
              <span className="text-sky-950 font-semibold text-base sm:text-lg">HealthPulse</span>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/" className="text-sky-600 hover:text-sky-700 font-medium text-sm px-2 py-1">
              Home
            </Link>
            <Link href="/dashboard" className="text-sky-600 hover:text-sky-700 font-medium text-sm px-2 py-1">
              Dashboard
            </Link>
            <Link href="/about" className="text-sky-600 hover:text-sky-700 font-medium text-sm px-2 py-1">
              About
            </Link>
            <Link href="/help" className="text-sky-600 hover:text-sky-700 font-medium text-sm px-2 py-1">
              Help
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}