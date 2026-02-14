import { useState } from "react";
import API from "../api/api.jsx";

function TranscriptInput({ setTasks }) {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    if (!transcript.trim()) return;

    try {
      setLoading(true);
      const res = await API.post("/extract", { transcript });
      setTasks(res.data);
      setTranscript("");
    } catch (err) {
      console.error(err);
      alert("Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <textarea
        rows="5"
        style={{ width: "100%" }}
        placeholder="Paste meeting transcript..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <button onClick={handleExtract} disabled={loading}>
        {loading ? "Extracting..." : "Extract Action Items"}
      </button>
    </div>
  );
}

export default TranscriptInput;
