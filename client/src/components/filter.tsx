interface FiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  stats: { total: number; pending: number; done: number };
}

function Filters({ filter, setFilter, stats }: FiltersProps) {
  const tabs = [
    { key: "all", label: "All", count: stats.total },
    { key: "pending", label: "Pending", count: stats.pending },
    { key: "done", label: "Done", count: stats.done },
  ];

  return (
    <div className="flex gap-1 bg-surface rounded-lg border border-border p-1 mb-6 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setFilter(tab.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
            filter === tab.key
              ? "bg-accent text-white shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-background"
          }`}
        >
          {tab.label}
          <span
            className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
              filter === tab.key ? "bg-white/20" : "bg-border"
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}

export default Filters;
