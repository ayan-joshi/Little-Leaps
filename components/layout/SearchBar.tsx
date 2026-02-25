'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import blogsRaw from '@/data/blogs.json';
import productAwardsRaw from '@/data/productAwards.json';
import type { Blog, ProductAwardsData } from '@/types';

const blogs = blogsRaw as Blog[];
const productAwards = productAwardsRaw as ProductAwardsData;

interface SearchResult {
  type: 'blog' | 'award';
  title: string;
  subtitle: string;
  href: string;
}

// Flatten product awards into a searchable list once at module level
const awardEntries: Array<{ name: string; brand: string; category: string }> = [];
for (const categories of Object.values(productAwards)) {
  for (const [category, tiers] of Object.entries(categories)) {
    for (const winner of Object.values(tiers)) {
      awardEntries.push({ name: winner.name, brand: winner.brand, category });
    }
  }
}

function runSearch(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const blogResults: SearchResult[] = [];
  for (const blog of blogs) {
    const matches =
      blog.title.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q) ||
      blog.author.name.toLowerCase().includes(q) ||
      blog.tags.some((t) => t.toLowerCase().includes(q));
    if (matches) {
      blogResults.push({
        type: 'blog',
        title: blog.title,
        subtitle: `${blog.category} · ${blog.author.name}`,
        href: '/blogs',
      });
    }
    if (blogResults.length === 3) break;
  }

  const awardResults: SearchResult[] = [];
  for (const award of awardEntries) {
    const matches =
      award.name.toLowerCase().includes(q) ||
      award.brand.toLowerCase().includes(q) ||
      award.category.toLowerCase().includes(q);
    if (matches) {
      awardResults.push({
        type: 'award',
        title: award.name,
        subtitle: `${award.category} · ${award.brand}`,
        href: '/awards',
      });
    }
    if (awardResults.length === 3) break;
  }

  return [...blogResults, ...awardResults];
}

interface DropdownProps {
  results: SearchResult[];
  query: string;
  onResultClick: () => void;
}

function Dropdown({ results, query, onResultClick }: DropdownProps) {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-lg
                    border border-gray-100 overflow-hidden z-50">
      {results.length === 0 ? (
        <p className="px-4 py-3 text-sm text-gray-400">
          No results for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <ul>
          {results.map((result, i) => (
            <li key={i}>
              <Link
                href={result.href}
                onClick={onResultClick}
                className="flex items-start gap-3 px-4 py-3 hover:bg-blush-50 transition-colors"
              >
                <span className={`shrink-0 mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                  result.type === 'blog'
                    ? 'bg-lavender-100 text-lavender-600'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {result.type === 'blog' ? 'Blog' : 'Award'}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
                    {result.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{result.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
}

export default function SearchBar({ variant = 'desktop' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = runSearch(query);
  const showDropdown = open && query.trim().length >= 2;

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
  }

  function handleResultClick() {
    setOpen(false);
    setQuery('');
  }

  const searchIcon = (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
    </svg>
  );

  if (variant === 'mobile') {
    return (
      <div ref={containerRef} className="relative mt-3 px-1">
        <div className="relative">
          {searchIcon}
          <input
            type="search"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search blogs & awards…"
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 text-sm
                       text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none
                       focus:ring-2 focus:ring-blush-300 focus:border-transparent"
            aria-label="Search blogs and awards"
            autoComplete="off"
          />
        </div>
        {showDropdown && (
          <Dropdown results={results} query={query} onResultClick={handleResultClick} />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        {searchIcon}
        <input
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search…"
          className="pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700
                     placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2
                     focus:ring-blush-300 focus:border-transparent
                     w-44 focus:w-60 transition-[width] duration-200"
          aria-label="Search blogs and awards"
          autoComplete="off"
        />
      </div>
      {showDropdown && (
        <Dropdown results={results} query={query} onResultClick={handleResultClick} />
      )}
    </div>
  );
}
