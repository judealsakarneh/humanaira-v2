import { Metadata } from 'next';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabaseServerComponent';
import { SearchFilters } from '@/components/ui/SearchFilters';
import { ServiceCard } from '@/components/ui/ServiceCard';

export const metadata: Metadata = {
  title: 'Search AI freelancers | Humanaira',
  description: 'Find AI builders across agents, automation, computer vision, analytics, and more.'
};

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const supabase = createServerSupabaseClient();
  const category = searchParams.category as string | undefined;
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
  const delivery = searchParams.delivery ? Number(searchParams.delivery) : undefined;

  let query = supabase
    .from('services')
    .select(
      'id, title, description, category, starting_price, delivery_time_days, tags, freelancer:profiles!services_freelancer_id_fkey(id, name, headline, country, avatar_url)'
    )
    .eq('is_active', true);

  if (category) query = query.eq('category', category);
  if (minPrice) query = query.gte('starting_price', minPrice);
  if (maxPrice) query = query.lte('starting_price', maxPrice);
  if (delivery) query = query.lte('delivery_time_days', delivery);

  const { data: services } = await query.limit(20);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-white">Search AI expertise</h1>
        <p className="text-gray-400">Filter by price, delivery speed, and category to find your match.</p>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[320px,1fr]">
        <SearchFilters params={searchParams} />
        <div className="grid gap-4 sm:grid-cols-2">
          {(services || []).map((service) => (
            <ServiceCard
              key={service.id}
              service={{
                id: service.id,
                title: service.title,
                description: service.description,
                starting_price: service.starting_price,
                tags: service.tags,
                category: service.category,
                delivery_time_days: service.delivery_time_days,
                freelancer: {
                  name: (service as any).freelancer?.name || 'AI expert',
                  headline: (service as any).freelancer?.headline || 'AI specialist',
                  avatar_url: (service as any).freelancer?.avatar_url || undefined,
                  country: (service as any).freelancer?.country || 'Remote'
                }
              }}
            />
          ))}
          {(!services || services.length === 0) && (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-gray-300">
              No services found. Add rows to the <code>services</code> table in Supabase and try again.
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 rounded-2xl border border-white/5 bg-white/5 p-6 text-center text-gray-200">
        <p className="text-sm">Want something custom? Connect with a concierge project architect.</p>
        <Link href="/auth/sign-up?role=buyer" className="btn-primary mt-3 inline-flex">
          Post a request
        </Link>
      </div>
    </div>
  );
}
