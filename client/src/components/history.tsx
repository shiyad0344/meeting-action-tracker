import { useEffect, useState } from "react";
import API from "../api/api";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import type { HistoryItem } from "../types";

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/tasks/history");
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  if (history.length === 0) {
    return (
      <p className="text-sm text-text-muted py-4">No transcripts found.</p>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((item) => {
        const isExpanded = expandedId === item._id;
        return (
          <div
            key={item._id}
            className="bg-surface rounded-lg border border-border overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedId(isExpanded ? null : item._id)
              }
              className="w-full flex items-center justify-between p-4 text-left hover:bg-background transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText
                  size={16}
                  className="text-text-muted flex-shrink-0"
                />
                <span className="text-sm font-medium text-text-primary truncate">
                  {item.content.slice(0, 80)}...
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className="text-xs text-text-muted">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                {isExpanded ? (
                  <ChevronDown size={16} className="text-text-muted" />
                ) : (
                  <ChevronRight size={16} className="text-text-muted" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 border-t border-border">
                <p className="text-sm text-text-secondary whitespace-pre-wrap mt-3 leading-relaxed">
                  {item.content}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
