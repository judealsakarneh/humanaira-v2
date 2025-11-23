type SearchFiltersProps = {
  params: Record<string, string | string[] | undefined>;
};

export function SearchFilters({ params }: SearchFiltersProps) {
  return (
    <aside className="glass rounded-2xl p-4 text-sm text-gray-200">
      <h3 className="text-lg font-semibold text-white">Filters</h3>
      <form className="mt-4 space-y-3" method="get">
        <div>
          <p className="text-xs text-gray-400">Category</p>
          <select
            name="category"
            defaultValue={(params.category as string) || ''}
            className="mt-1 w-full rounded-lg border border-white/10 bg-dark px-3 py-2 text-sm text-gray-100"
          >
            <option value="">Any</option>
            <option>AI Chatbots</option>
            <option>Data & Analytics</option>
            <option>Computer Vision</option>
            <option>Automation & Agents</option>
            <option>AI Content</option>
          </select>
        </div>
        <div>
          <p className="text-xs text-gray-400">Min price ($)</p>
          <input
            name="minPrice"
            defaultValue={(params.minPrice as string) || ''}
            className="mt-1 w-full rounded-lg border border-white/10 bg-dark px-3 py-2 text-sm text-gray-100"
            placeholder="50"
            type="number"
            min="0"
          />
        </div>
        <div>
          <p className="text-xs text-gray-400">Max price ($)</p>
          <input
            name="maxPrice"
            defaultValue={(params.maxPrice as string) || ''}
            className="mt-1 w-full rounded-lg border border-white/10 bg-dark px-3 py-2 text-sm text-gray-100"
            placeholder="200"
            type="number"
            min="0"
          />
        </div>
        <div>
          <p className="text-xs text-gray-400">Delivery (days)</p>
          <input
            name="delivery"
            defaultValue={(params.delivery as string) || ''}
            className="mt-1 w-full rounded-lg border border-white/10 bg-dark px-3 py-2 text-sm text-gray-100"
            placeholder="7"
            type="number"
            min="1"
          />
        </div>
        <button className="btn-primary w-full justify-center" type="submit">
          Apply filters
        </button>
      </form>
    </aside>
  );
}
