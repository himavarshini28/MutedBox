'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background-light py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          MutedBox
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-text p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16m-7 6h7" 
              />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-text hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-text hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/feedback" className="text-text hover:text-primary transition-colors">
            View Feedback
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden container mx-auto px-4 pb-4 pt-2 flex flex-col space-y-3">
          <Link 
            href="/" 
            className="text-text hover:text-primary transition-colors py-2 block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-text hover:text-primary transition-colors py-2 block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/feedback" 
            className="text-text hover:text-primary transition-colors py-2 block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            View Feedback
          </Link>
        </nav>
      )}
    </header>
  );
}
