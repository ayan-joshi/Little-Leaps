'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SearchBar from './SearchBar';

const navLinks = [
  { href: '/',       label: 'Home' },
  { href: '/awards', label: 'Awards' },
  { href: '/blogs',  label: 'Blog' },
  { href: '/quiz',   label: 'Milestone Quiz' },
  { href: '/about',  label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blush-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg"
              aria-label="Little Leaps home">
          <Image
            src="/images/logo-mark.svg"
            alt="Little Leaps logo mark"
            width={36}
            height={36}
            priority
          />
          <span className="font-display text-xl leading-none">
            <span className="text-blush-500">Little</span>
            <span className="text-lavender-500">Leaps</span>
          </span>
        </Link>

        {/* Desktop nav + search */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600
                           hover:text-blush-500 hover:bg-blush-50 transition-colors focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <SearchBar variant="desktop" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden tap-target flex items-center justify-center rounded-full p-2
                     text-gray-600 hover:bg-blush-50 focus-ring"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div id="mobile-nav" className="md:hidden bg-white border-t border-blush-100 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="tap-target flex items-center px-4 py-3 rounded-2xl text-sm font-semibold
                           text-gray-700 hover:text-blush-500 hover:bg-blush-50 transition-colors focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <SearchBar variant="mobile" />
        </div>
      )}
    </header>
  );
}
