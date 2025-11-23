import Link from 'next/link';
import { Star } from 'lucide-react';

export type ServiceCardProps = {
  service: {
    id: string;
    title: string;
    description: string;
    starting_price: number;
    delivery_time_days: number;
    rating?: number;
    category: string;
    tags?: string[] | null;
    freelancer?: {
      name?: string | null;
      headline?: string | null;
      avatar_url?: string | null;
      country?: string | null;
    };
  };
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="glass card-hover rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-brand">{service.category}</p>
      <h3 className="mt-2 text-lg font-semibold text-white">{service.title}</h3>
      <p className="mt-1 text-sm text-gray-300 line-clamp-3">{service.description}</p>
      {service.freelancer && (
        <div className="mt-3 text-sm text-gray-400">
          <p className="font-semibold text-white">{service.freelancer.name}</p>
          <p>{service.freelancer.headline}</p>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {(service.tags || []).map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-brand">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
        <span className="flex items-center gap-1">
          <Star className="h-4 w-4 text-brand" /> {service.rating ?? 'New'}
        </span>
        <span>From ${service.starting_price}</span>
        <span>{service.delivery_time_days}d delivery</span>
      </div>
      <Link href={`/services/${service.id}`} className="mt-4 inline-flex text-sm text-brand">
        View details
      </Link>
    </div>
  );
}
