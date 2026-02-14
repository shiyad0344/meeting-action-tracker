import { useEffect, useState } from "react";
import API from "../api/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);



  const fetchHistory = async () => {
    try {
      const res = await API.get("/tasks/history");
      setHistory(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <div>
      <h2>Recent Transcripts</h2>

        {!showHistory && (
        <button onClick={fetchHistory}>
          Load History
        </button>
      )}

      { showHistory && history.map((item) => {
  const isExpanded = expandedId === item._id;

  return (
    <div key={item._id} className="history-card">
      <p>
        {isExpanded
          ? item.content
          : item.content.slice(0, 120) + "..."}
      </p>

      <button
        onClick={() =>
          setExpandedId(isExpanded ? null : item._id)
        }
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>

      <small>
        {"Processed date: " + new Date(item.createdAt)
          .toISOString()
          .split("T")[0]}
      </small>
    </div>
  );
})}
    </div>
  );
}
