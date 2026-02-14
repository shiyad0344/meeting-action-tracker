import { useState } from "react";
import API from "../api/api.jsx";

function TaskItem({ task, refreshTasks }) {
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

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "10px",
      marginBottom: "10px"
    }}>
      {editing ? (
        <>
          <input
            value={updatedTask.task}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, task: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3 style={{
            textDecoration:
              task.status === "done" ? "line-through" : "none"
          }}>
            {task.task}
          </h3>
          <p>Owner: {task.owner || "Unassigned"}</p>
          <p>Due: {task.dueDate || "None"}</p>
        </>
      )}

      <button onClick={toggleStatus}>
        {task.status === "pending" ? "Mark Done" : "Mark Pending"}
      </button>

      <button onClick={() => setEditing(!editing)}>
        Edit
      </button>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
