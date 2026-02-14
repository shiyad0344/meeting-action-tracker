import { useState } from "react";
import API from "../api/api";

export default function Status() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    try {
      setLoading(true);
      const res = await API.get("/status");
      setStatus(res.data);
    } catch (err) {
      console.error(err);
      setStatus({
        backend: false,
        database: false,
        llm: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>System Status</h2>

      <button onClick={checkStatus}>
        Check System Health
      </button>

      {loading && <p>Checking...</p>}

      {status && (
        <div style={{ marginTop: "15px" }}>
          <p>
            Backend: {status.backend ? "Healthy" : "Down"}
          </p>
          <p>
            Database: {status.database ? "Connected" : "Not Connected"}
          </p>
          <p>
            LLM: {status.llm ? "Connected" : "Error"}
          </p>
        </div>
      )}
    </div>
  );
}
