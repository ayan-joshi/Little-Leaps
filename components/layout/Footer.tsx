import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Explore: [
    { href: '/awards', label: 'Awards Shop' },
    { href: '/blogs',  label: 'Blog' },
    { href: '/quiz',   label: 'Milestone Quiz' },
  ],
  Company: [
    { href: '/about',   label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3 w-fit focus-ring rounded-lg"
                  aria-label="Little Leaps home">
              <Image
                src="/images/logo-mark.svg"
                alt="Little Leaps logo mark"
                width={32}
                height={32}
              />
              <span className="font-display text-xl leading-none">
                <span className="text-blush-500">Little</span>
                <span className="text-lavender-500">Leaps</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Celebrating every precious milestone in your baby&apos;s incredible journey — one award at a time.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-blush-500 transition-colors focus-ring rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center
                        justify-between gap-3 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Little Leaps. All rights reserved.</p>
          <p>Made with care for parents everywhere</p>
        </div>
      </div>
    </footer>
  );
}
