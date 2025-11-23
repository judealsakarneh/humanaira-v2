import Link from 'next/link';
import { format } from 'date-fns';

const posts = [
  {
    title: 'Shipping AI products faster with agency-style squads',
    slug: 'shipping-ai-products-faster',
    excerpt: 'How elite AI freelancers collaborate with humans to move from idea to production in record time.',
    published_at: new Date().toISOString(),
    tags: ['AI strategy', 'Delivery']
  },
  {
    title: 'What great AI project briefs look like',
    slug: 'great-ai-project-briefs',
    excerpt: 'Avoid scope creep and drive clarity with these prompt-driven discovery templates.',
    published_at: new Date().toISOString(),
    tags: ['Briefs', 'Product']
  },
  {
    title: 'The freelancer stack: tools every AI builder uses',
    slug: 'freelancer-stack',
    excerpt: 'LLM ops, observability, DX automation and billing tips to stay profitable.',
    published_at: new Date().toISOString(),
    tags: ['Tooling', 'Tips']
  }
];

export function FeaturedBlog() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Blog</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Fresh insights on AI freelancing</h2>
        </div>
        <Link href="/blog" className="text-sm text-brand">
          Read the blog
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="glass card-hover flex flex-col rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{format(new Date(post.published_at), 'MMM d')}</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">{post.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
