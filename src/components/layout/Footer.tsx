import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark px-6 py-10 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-brand">human<span className="text-white">AI</span>ra</p>
          <p className="mt-2 max-w-md text-gray-400">
            Humanaira blends human creativity with AI precision, empowering a new era of freelance collaboration.
          </p>
        </div>
        <div className="flex gap-10 text-gray-400">
          <div className="flex flex-col gap-2">
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
