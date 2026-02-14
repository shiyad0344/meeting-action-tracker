import { useState } from "react";
import API from "../api/api";
import { Send, Loader2 } from "lucide-react";
interface TranscriptInputProps {
  onExtracted: () => void;
}

function TranscriptInput({ onExtracted }: TranscriptInputProps) {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!transcript.trim()) {
      setError("Transcript cannot be empty.");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await API.post("/extract", { transcript });
      setTranscript("");
      onExtracted();
    } catch (err) {
      console.error(err);
      setError("Extraction failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold text-text-primary mb-1">
        Meeting Transcript
      </h2>
      <p className="text-sm text-text-secondary mb-4">
        Paste your meeting transcript below to extract action items automatically.
      </p>

      <textarea
        className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition text-sm"
        placeholder="Paste meeting transcript here..."
        value={transcript}
        onChange={(e) => {
          setTranscript(e.target.value);
          if (error) setError(null);
        }}
      />

      {error && (
        <p className="text-sm text-danger mt-2">{error}</p>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleExtract}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )}
          {loading ? "Extracting..." : "Extract Action Items"}
        </button>
      </div>
    </div>
  );
}

export default TranscriptInput;
