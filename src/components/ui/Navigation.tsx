import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                <span className="text-white font-semibold">H</span>
              </div>
              <span className="text-sky-950 font-semibold text-lg">HealthPulse</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
              Home
            </Link>
            <Link href="/about" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
              About
            </Link>
            <Link href="/dashboard" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
              Dashboard
            </Link>
            <Link href="/help" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
              Help
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}