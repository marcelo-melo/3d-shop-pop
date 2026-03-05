'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg">
      <div className="max-w-[480px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          <h1 className="text-xl font-bold text-white drop-shadow-md">
            3D Shop Pop
          </h1>
        </Link>
        <Link 
          href="/cart" 
          className="relative bg-white/20 hover:bg-white/30 transition-colors rounded-full p-2"
        >
          <span className="text-2xl">🛒</span>
        </Link>
      </div>
    </header>
  );
}
