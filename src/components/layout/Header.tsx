'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '/categories', label: 'Categories' },
  { href: '/search', label: 'Browse Freelancers' },
  { href: '/blog', label: 'Blog' },
  { href: '/how-it-works', label: 'How It Works' }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-dark/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-brand">
          human<span className="text-white">AI</span>ra
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'hover:text-brand transition-colors',
                pathname?.startsWith(link.href) ? 'text-brand' : 'text-gray-300'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/auth/sign-in" className="text-gray-300 hover:text-white">
            Sign in
          </Link>
          <Link href="/auth/sign-up" className="btn-primary">
            Get started
          </Link>
        </nav>
        <button
          className="rounded-lg border border-white/5 p-2 md:hidden"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-dark/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-200" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/auth/sign-in" className="text-gray-200" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <Link href="/auth/sign-up" className="btn-primary justify-center" onClick={() => setOpen(false)}>
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
