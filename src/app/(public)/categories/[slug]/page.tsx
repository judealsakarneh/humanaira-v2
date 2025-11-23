import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabaseServerComponent';
import { ServiceCard } from '@/components/ui/ServiceCard';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = `${params.slug.replace(/-/g, ' ')} AI talent | Humanaira`;
  return {
    title,
    description: `Browse ${params.slug.replace(/-/g, ' ')} specialists on Humanaira.`
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient();
  const categoryName = params.slug.replace(/-/g, ' ');

  const { data: services } = await supabase
    .from('services')
    .select(
      'id, title, description, category, starting_price, delivery_time_days, tags, freelancer:profiles!services_freelancer_id_fkey(id, name, headline, country, avatar_url)'
    )
    .eq('category', categoryName)
    .eq('is_active', true)
    .limit(20);

  if (!services) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-white">{categoryName}</h1>
      <p className="text-gray-400">Explore specialists vetted for {categoryName} projects.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={{
              id: service.id,
              title: service.title,
              description: service.description,
              starting_price: service.starting_price,
              category: service.category,
              delivery_time_days: service.delivery_time_days,
              tags: service.tags,
              freelancer: {
                name: (service as any).freelancer?.name || 'AI expert',
                headline: (service as any).freelancer?.headline || 'AI specialist',
                avatar_url: (service as any).freelancer?.avatar_url || undefined,
                country: (service as any).freelancer?.country || 'Remote'
              }
            }}
          />
        ))}
        {services.length === 0 && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-gray-300">
            No listings in this category yet. Encourage freelancers to publish their services.
          </div>
        )}
      </div>
    </div>
  );
}
