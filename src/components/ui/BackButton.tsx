import Link from 'next/link';

export default function BackButton() {
    return (
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-sky-50 text-sky-600 rounded-lg border border-sky-100 shadow-sm transition-colors text-sm font-medium"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        Back to Home
      </Link>
    );
  }