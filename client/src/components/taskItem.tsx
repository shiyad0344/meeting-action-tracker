import { useState } from "react";
import API from "../api/api";
import { Check, Pencil, Trash2, Save, X, User, Calendar } from "lucide-react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  refreshTasks: () => void;
}

function TaskItem({ task, refreshTasks }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const toggleStatus = async () => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "done" : "pending",
    });
    refreshTasks();
  };

  const handleUpdate = async () => {
    await API.put(`/tasks/${task._id}`, updatedTask);
    setEditing(false);
    refreshTasks();
  };

  const handleDelete = async () => {
    await API.delete(`/tasks/${task._id}`);
    refreshTasks();
  };

  if (editing) {
    return (
      <div className="bg-surface rounded-xl border border-accent/30 p-5 shadow-sm">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">
              Task
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
              value={updatedTask.task}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, task: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">
                Owner
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                value={updatedTask.owner || ""}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, owner: e.target.value })
                }
                placeholder="Unassigned"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">
                Due Date
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                value={updatedTask.dueDate || ""}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
                }
                placeholder="No due date"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setEditing(false);
                setUpdatedTask(task);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-background text-sm font-medium transition cursor-pointer"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-success hover:bg-green-700 text-white text-sm font-medium transition cursor-pointer"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition group">
      <div className="flex items-start justify-between">
        {/* Left: status toggle + task content */}
        <div className="flex items-start gap-4">
          <button
            onClick={toggleStatus}
            className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition cursor-pointer ${
              task.status === "done"
                ? "bg-success border-success text-white"
                : "border-border hover:border-accent"
            }`}
          >
            {task.status === "done" && <Check size={14} />}
          </button>

          <div>
            <h3
              className={`font-medium text-text-primary ${
                task.status === "done" ? "line-through opacity-60" : ""
              }`}
            >
              {task.task}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <User size={14} />
                {task.owner || "Unassigned"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {task.dueDate
                  ? new Date(task.dueDate + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                  : "No due date"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: badge + action buttons */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              task.status === "done"
                ? "bg-success-light text-success"
                : "bg-warning-light text-warning"
            }`}
          >
            {task.status === "done" ? "Done" : "Pending"}
          </span>

          <button
            onClick={() => setEditing(true)}
            className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent-soft transition opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger-light transition opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
