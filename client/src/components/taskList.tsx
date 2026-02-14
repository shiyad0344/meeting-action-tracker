import TaskItem from "./taskItem";
import { ClipboardList } from "lucide-react";
import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  refreshTasks: () => void;
}

function TaskList({ tasks, refreshTasks }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          <ClipboardList size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No tasks found</p>
          <p className="text-sm mt-1">
            Extract action items from a meeting transcript to get started.
          </p>
        </div>
      )}
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} refreshTasks={refreshTasks} />
      ))}
    </div>
  );
}

export default TaskList;
