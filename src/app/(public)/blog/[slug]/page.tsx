import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { createServerSupabaseClient } from '@/lib/supabaseServerComponent';

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) return { title: 'Post not found | Humanaira' };
  return { title: `${post.title} | Humanaira`, description: post.excerpt };
}

async function renderMarkdown(markdown: string) {
  const processed = await remark().use(remarkHtml).process(markdown);
  return processed.toString();
}

export default async function BlogPostPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, content, published_at, tags')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) return notFound();
  const htmlContent = await renderMarkdown(post.content);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-xs uppercase tracking-[0.3em] text-brand">Blog</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">{post.title}</h1>
      <p className="text-gray-400">{post.published_at ? new Date(post.published_at).toDateString() : 'Draft'}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(post.tags || []).map((tag: string) => (
          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-brand">
            {tag}
          </span>
        ))}
      </div>
      <article className="prose prose-invert mt-8" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
