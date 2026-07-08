import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";
import { Upload, X, ArrowLeft } from "lucide-react";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [currentImage, setCurrentImage] = useState(null); // image already saved on the trip
  const [imageFile, setImageFile] = useState(null);        // newly picked file, if any
  const [imagePreview, setImagePreview] = useState(null);  // preview for the newly picked file

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    API.get(`/trips/${id}`)
      .then((res) => {
        const trip = res.data.trip;
        setName(trip.name);
        setCurrentImage(trip.image);
      })
      .catch(() => setError("Failed to load trip"))
      .finally(() => setLoading(false));
  }, [id]);

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

  const removeNewImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) formData.append("image", imageFile);

      // Clear the instance's default JSON Content-Type so the browser can set
      // the correct multipart boundary itself (same fix as CreateTrip.jsx)
      await API.put(`/trips/${id}`, formData, {
        headers: { "Content-Type": undefined },
      });

      setSaved(true);
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update trip");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  // What to actually show in the image slot: a newly picked preview takes
  // priority, otherwise fall back to whatever the trip already has saved
  const displayImage = imagePreview || currentImage;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="fade-up w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors mb-6"
        >
          <ArrowLeft size={13} /> Back to dashboard
        </Link>

        <h1 className="cinzel text-3xl text-[var(--accent)] mb-1">Edit Trip</h1>
        <p className="text-gray-500 text-sm mb-8">Update the name or cover photo</p>

        <input
          type="text"
          placeholder="Trip name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-200 text-sm
            text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
        />

        {displayImage ? (
          <div className="relative mb-5 rounded-xl overflow-hidden h-40">
            <img src={displayImage} alt="Trip cover" className="w-full h-full object-cover" />

            {imagePreview && (
              <button
                onClick={removeNewImage}
                type="button"
                title="Cancel new photo, keep the current one"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70
                  flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            )}

            <label
              className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-white/90 hover:bg-white text-xs text-gray-700 cursor-pointer transition-colors shadow-sm"
            >
              <Upload size={12} />
              {currentImage && !imagePreview ? "Change photo" : "Replace photo"}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        ) : (
          <label
            className="flex flex-col items-center justify-center gap-2 mb-5 h-40 rounded-xl
              border-2 border-dashed border-gray-200 text-gray-400 cursor-pointer
              hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
          >
            <Upload size={20} />
            <span className="text-xs">Add a cover photo</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="btn btn-primary w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}