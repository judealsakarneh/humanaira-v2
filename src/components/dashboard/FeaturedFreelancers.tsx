import Link from 'next/link';
import { Star } from 'lucide-react';

const freelancers = [
  {
    name: 'Nova Park',
    title: 'Automation Architect',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    from: '$120/hr',
    tags: ['Agents', 'Zapier', 'TypeScript']
  },
  {
    name: 'Mika Lee',
    title: 'LLM App Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    from: '$95/hr',
    tags: ['OpenAI', 'Next.js', 'Supabase']
  },
  {
    name: 'Cairo Singh',
    title: 'CV & Multimodal Specialist',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    from: '$140/hr',
    tags: ['Computer Vision', 'Torch', 'Edge AI']
  }
];

export function FeaturedFreelancers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Freelancers</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Elite AI specialists ready to ship</h2>
        </div>
        <Link href="/search" className="text-sm text-brand">
          Browse all
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {freelancers.map((freelancer) => (
          <div key={freelancer.name} className="glass card-hover rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <img src={freelancer.avatar} alt={freelancer.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="text-lg font-semibold text-white">{freelancer.name}</p>
                <p className="text-sm text-gray-400">{freelancer.title}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
              <Star className="h-4 w-4 text-brand" /> {freelancer.rating} • From {freelancer.from}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {freelancer.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/freelancers" className="mt-4 inline-flex text-sm text-brand">
              View profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
