'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ placeholder }: { placeholder?: string }) {
  const [value, setValue] = useState('');
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3 rounded-full border border-white/10 bg-dark/70 px-4 py-3">
      <Search className="h-5 w-5 text-brand" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent text-sm text-gray-100 outline-none placeholder:text-gray-500"
        placeholder={placeholder || 'Search AI talent...'}
      />
      <button type="submit" className="btn-primary">Search</button>
    </form>
  );
}
