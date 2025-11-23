import { Metadata } from 'next';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabaseServerComponent';

export const metadata: Metadata = {
  title: 'AI freelancing blog | Humanaira',
  description: 'Learn how to hire and sell AI expertise with curated guides from Humanaira.'
};

export default async function BlogIndexPage() {
  const supabase = createServerSupabaseClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, published_at, tags')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(12);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-brand">Insights</p>
        <h1 className="text-3xl font-semibold text-white">Humanaira AI freelancing playbook</h1>
        <p className="text-gray-400">Playbooks on building, hiring, and collaborating with AI specialists.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(posts || []).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="glass card-hover flex flex-col gap-3 rounded-2xl p-5"
          >
            <div className="text-xs text-gray-400">{post.published_at ? new Date(post.published_at).toDateString() : 'Draft'}</div>
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            <p className="text-gray-400">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-brand">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-gray-300">
            No posts published yet. Populate the <code>blog_posts</code> table in Supabase to feature articles here.
          </div>
        )}
      </div>
      <div className="mt-12 rounded-2xl border border-brand/30 bg-brand/5 p-6 text-center text-gray-100">
        <h3 className="text-xl font-semibold text-white">Ready to collaborate?</h3>
        <p className="text-gray-300">Join as a freelancer to monetize your AI superpowers or hire a curated expert.</p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/auth/sign-up?role=freelancer" className="btn-primary">
            Become a freelancer
          </Link>
          <Link
            href="/auth/sign-up?role=buyer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-gray-100 hover:border-brand hover:text-brand"
          >
            Hire talent
          </Link>
        </div>
      </div>
    </div>
  );
}
