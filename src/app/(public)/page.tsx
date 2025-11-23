import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { FeaturedBlog } from '@/components/blog/FeaturedBlog';
import { FeaturedFreelancers } from '@/components/dashboard/FeaturedFreelancers';
import { SearchBar } from '@/components/ui/SearchBar';

const categories = [
  'AI Chatbots',
  'Data & Analytics',
  'Computer Vision',
  'Automation & Agents',
  'AI Content',
  'Voice & Audio'
];

export default function HomePage() {
  return (
    <div className="bg-dark">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-14 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            <Sparkles className="h-4 w-4 text-brand" />
            Human + AI superteams for every project
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Hire elite AI freelancers or monetize your AI mastery with Humanaira
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Discover vetted specialists in agents, LLM apps, automation, computer vision, data science, and more. Build the
            future with a marketplace crafted for AI-first work.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/search" className="btn-primary">
              Find AI freelancers <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/sign-up?role=freelancer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-gray-100 hover:border-brand hover:text-brand"
            >
              Offer your AI skills
            </Link>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6 shadow-glow">
            <SearchBar placeholder="Search AI skills, tools, or services..." />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                className="glass card-hover rounded-xl p-4 text-center text-gray-100"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative flex-1">
          <div className="glass relative overflow-hidden rounded-3xl border border-white/5 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-white/5" />
            <div className="relative grid grid-cols-2 gap-4 text-sm text-gray-200">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass card-hover rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Top talent</span>
                    <Star className="h-4 w-4 text-brand" />
                  </div>
                  <p className="mt-2 text-lg font-semibold text-white">AI Specialist {i}</p>
                  <p className="text-xs text-gray-400">Avg. rating 4.{7 + (i % 2)} • From $75/hr</p>
                </div>
              ))}
            </div>
            <div className="relative mt-6 rounded-2xl border border-white/5 bg-dark/60 p-4">
              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80"
                  alt="AI freelancer"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-gray-400">Featured freelancer</p>
                  <p className="text-lg font-semibold text-white">Nova Park • Automation Architect</p>
                  <p className="text-xs text-brand">"I ship production-ready AI automations in days, not weeks."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <FeaturedFreelancers />
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <FeaturedBlog />
      </section>
    </div>
  );
}
