import { useEffect, useState } from "react";
import API from "./api/api";
import History from "./components/history.jsx";
import TranscriptInput from "./components/transcripinput";
import TaskList from "./components/taskList.jsx";
import Filters from "./components/filter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Meeting Action Tracker</h1>

      <TranscriptInput setTasks={setTasks} />
      <Filters setFilter={setFilter} />
      <TaskList tasks={filteredTasks} refreshTasks={fetchTasks} />
      <History />  
    </div>
  );
}

export default App;

