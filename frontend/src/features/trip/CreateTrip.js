
import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Upload, X, Check, Copy } from "lucide-react";

export default function CreateTrip() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCreate = async () => {
    setError("");
    setLoading(true);
    try {
      // multipart/form-data so we can send the file alongside the trip name
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) formData.append("image", imageFile);

      // API's axios instance defaults to "Content-Type: application/json" for every
      // request — we have to explicitly clear that here so the browser can set the
      // correct "multipart/form-data; boundary=..." header itself. If we don't,
      // the request goes out as broken/mislabeled multipart data and the server
      // can't parse the file (or sometimes not even the other fields).
      const res = await API.post("/trips", formData, {
        headers: { "Content-Type": undefined },
      });

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)]">
      <div className="fade-up w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-sm p-10 text-center">
        <h1 className="cinzel text-3xl text-[var(--accent)] mb-1">Start a New Trip</h1>
        <p className="text-[var(--text-dim)] text-sm mb-8">Invite your travel companions</p>

        {!inviteLink ? (
          <>
            <input
              type="text"
              placeholder="Trip name (e.g. Pokhara Getaway)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] text-sm
                bg-[var(--bg-subtle)] text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
            />

            {/* Cover image upload */}
            {imagePreview ? (
              <div className="relative mb-5 rounded-xl overflow-hidden h-40">
                <img src={imagePreview} alt="Trip cover preview" className="w-full h-full object-cover" />
                <button
                  onClick={removeImage}
                  type="button"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70
                    flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label
                className="flex flex-col items-center justify-center gap-2 mb-5 h-40 rounded-xl
                  border-2 border-dashed border-[var(--border)] text-[var(--text-dim)] cursor-pointer
                  hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
              >
                <Upload size={20} />
                <span className="text-xs">Add a cover photo (optional)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleCreate}
              disabled={loading || !name.trim()}
              className="btn btn-primary w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Trip"}
            </button>
          </>
        ) : (
          <>
            <p className="text-[var(--text-dim)] text-sm mb-3">Share this link with your travel companions:</p>
            <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--text)] break-all mb-4">
              {inviteLink}
            </div>
            <button
              onClick={handleCopy}
              className="btn btn-primary w-full py-3.5 text-base mb-3 flex items-center justify-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-[var(--text-dim)] text-sm underline hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}