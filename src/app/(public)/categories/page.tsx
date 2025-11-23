import Link from 'next/link';
import { Metadata } from 'next';

const categories = ['AI Chatbots', 'Data & Analytics', 'Computer Vision', 'Automation & Agents', 'AI Content'];

export const metadata: Metadata = {
  title: 'Categories | Humanaira',
  description: 'Browse AI freelance services by category.'
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-white">Categories</h1>
      <p className="text-gray-400">Explore AI expertise areas curated for buyers.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
            className="glass card-hover rounded-2xl p-4 text-gray-100"
          >
            <h3 className="text-lg font-semibold text-white">{cat}</h3>
            <p className="text-sm text-gray-400">Specialists in {cat.toLowerCase()} ready to ship.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
