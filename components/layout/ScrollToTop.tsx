'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Instant scroll — feels like a normal page load, not an animated jump
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
