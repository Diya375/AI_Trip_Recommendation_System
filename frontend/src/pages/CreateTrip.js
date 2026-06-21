import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
  const [name, setName] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/trips", { name });
      const trip = res.data.trip;
      const link = `${window.location.origin}/join/${trip.invite_code}`;
      setInviteLink(link);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card fade-up" style={{ width: "100%", maxWidth: "480px", padding: "3rem 2.5rem", textAlign: "center" }}>
        <h1 className="cinzel" style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
          Start a New Trip
        </h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Invite your travel companions
        </p>

        {!inviteLink ? (
          <>
            <input
              type="text"
              placeholder="Trip name (e.g. Pokhara Getaway)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              style={{ marginBottom: "1.5rem" }}
            />

            {error && (
              <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</p>
            )}

            <button
              onClick={handleCreate}
              disabled={loading || !name.trim()}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
            >
              {loading ? "Creating..." : "Create Trip"}
            </button>
          </>
        ) : (
          <>
            <p style={{ color: "var(--text-dim)", marginBottom: "1rem", fontSize: "0.9rem" }}>
              Share this link with your travel companions:
            </p>
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "0.85rem 1rem",
                fontSize: "0.85rem",
                color: "var(--text)",
                wordBreak: "break-all",
                marginBottom: "1rem",
              }}
            >
              {inviteLink}
            </div>
            <button
              onClick={handleCopy}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", fontSize: "1rem", marginBottom: "0.75rem" }}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-dim)",
                fontSize: "0.85rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}