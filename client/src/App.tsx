import { useEffect, useState } from "react";
import API from "./api/api";
import type { Task, StatusData } from "./types";
import Sidebar from "./components/Sidebar";
import History from "./components/history";
import TranscriptInput from "./components/transcripinput";
import TaskList from "./components/taskList";
import Filters from "./components/filter";

type Page = "dashboard" | "history";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [status, setStatus] = useState<StatusData | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

  const checkStatus = async () => {
    try {
      setStatusLoading(true);
      const res = await API.get("/status");
      setStatus(res.data);
    } catch (err) {
      console.error(err);
      setStatus({ backend: false, database: false, llm: false });
    } finally {
      setStatusLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        status={status}
        stats={stats}
        onRefreshStatus={checkStatus}
        statusLoading={statusLoading}
        activePage={page}
        onNavigate={setPage}
      />

      <main className="ml-64 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {page === "dashboard" ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary text-sm mt-1">
                  Extract and track action items from your meetings
                </p>
              </div>

              <TranscriptInput onExtracted={fetchTasks} />
              <Filters filter={filter} setFilter={setFilter} stats={stats} />
              <TaskList tasks={filteredTasks} refreshTasks={fetchTasks} />
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary">History</h1>
                <p className="text-text-secondary text-sm mt-1">
                  Browse your recent meeting transcripts
                </p>
              </div>

              <History />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
