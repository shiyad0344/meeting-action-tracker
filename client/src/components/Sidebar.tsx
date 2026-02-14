import {
  ClipboardList,
  LayoutDashboard,
  Clock,
  RefreshCw,
  Server,
  Database,
  Cpu,
} from "lucide-react";
import type { StatusData } from "../types";

interface Stats {
  total: number;
  pending: number;
  done: number;
}

interface SidebarProps {
  status: StatusData | null;
  stats: Stats;
  onRefreshStatus: () => void;
  statusLoading: boolean;
  activePage: "dashboard" | "history";
  onNavigate: (page: "dashboard" | "history") => void;
}

function StatusRow({
  label,
  icon,
  ok,
}: {
  label: string;
  icon: React.ReactNode;
  ok: boolean | undefined;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={`w-2 h-2 rounded-full ${
            ok === undefined
              ? "bg-text-muted"
              : ok
                ? "bg-success"
                : "bg-danger"
          }`}
        />
        <span
          className={`text-xs ${
            ok === undefined
              ? "text-text-muted"
              : ok
                ? "text-green-400"
                : "text-red-400"
          }`}
        >
          {ok === undefined ? "Unknown" : ok ? "Healthy" : "Down"}
        </span>
      </div>
    </div>
  );
}

export default function Sidebar({
  status,
  
  onRefreshStatus,
  statusLoading,
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-white flex flex-col z-10">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
            <ClipboardList size={20} />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight">
              Action Tracker
            </span>
            <p className="text-xs text-text-muted">Meeting Tools</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <a
          onClick={() => onNavigate("dashboard")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition ${
            activePage === "dashboard"
              ? "bg-sidebar-hover text-white"
              : "text-text-muted hover:bg-sidebar-hover hover:text-white"
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </a>
        <a
          onClick={() => onNavigate("history")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition ${
            activePage === "history"
              ? "bg-sidebar-hover text-white"
              : "text-text-muted hover:bg-sidebar-hover hover:text-white"
          }`}
        >
          <Clock size={18} />
          History
        </a>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            System Status
          </span>
          <button
            onClick={onRefreshStatus}
            disabled={statusLoading}
            className="p-1 rounded text-text-muted hover:text-white transition disabled:opacity-50"
            title="Refresh status"
          >
            <RefreshCw
              size={14}
              className={statusLoading ? "animate-spin" : ""}
            />
          </button>
        </div>
        <StatusRow
          label="Backend"
          icon={<Server size={14} />}
          ok={status?.backend}
        />
        <StatusRow
          label="Database"
          icon={<Database size={14} />}
          ok={status?.database}
        />
        <StatusRow
          label="LLM Service"
          icon={<Cpu size={14} />}
          ok={status?.llm}
        />
      </div>

    </aside>
  );
}
