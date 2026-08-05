import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
// ⚠️ Adjust this import path to wherever FinalDestinationView actually lives in your project
import FinalDestinationView from "../../components/trip/FinalDestinationView";
import { Sparkles, Loader2, AlertTriangle, ArrowLeft } from "lucide-react";

export default function FinalDestination() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [trip, setTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(null);
  const [accepting, setAccepting] = useState(false);

  const load = useCallback(async () => {
    try {
      const [userRes, tripRes, prefRes] = await Promise.all([
        API.get("/auth/me"),
        API.get(`/trips/${id}`),
        API.get(`/trips/${id}/preferences`),
      ]);
      setUser(userRes.data);
      setTrip(tripRes.data.trip);
      setMembers(tripRes.data.members);
      setRole(prefRes.data.role);
      setLoadError(null);
    } catch (err) {
      console.error("FinalDestination: failed to load", err);
      const status = err?.response?.status;
      setLoadError(
        status === 404
          ? "This trip couldn't be found."
          : status === 403
          ? "You don't have access to this trip."
          : "Something went wrong while loading this page."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  // If the AI is mid-generation (someone else may have triggered it), poll until it's done
  useEffect(() => {
    if (trip?.status !== "ai_processing") return;
    const interval = setInterval(load, 4000);
    return () => clearInterval(interval);
  }, [trip?.status, load]);

  const handleGenerate = async () => {
    setGenerating(true);
    setGenError(null);
    try {
      const prefRes = await API.get(`/trips/${id}/preferences`);
      const allPreferences = prefRes.data.preferences;
      if (!allPreferences?.length) {
        setGenError("No members have submitted preferences yet.");
        return;
      }
      await API.post("/ai/final-recommendation", {
        tripId: parseInt(id),
        tripName: trip?.name,
        members,
        preferences: allPreferences,
      });
      await load();
    } catch (err) {
      console.error("Failed to generate recommendation", err);
      setGenError(err.response?.data?.error || "Failed to generate a recommendation. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleAccept = async () => {
    setAccepting(true);
    try {
      await API.post(`/trips/${id}/accept-recommendation`);
      await load();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to accept recommendation");
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-[var(--text-dim)] text-sm animate-pulse">Loading final destination...</p>
      </DashboardLayout>
    );
  }

  if (loadError) {
    return (
      <DashboardLayout>
        <div className="max-w-md mx-auto text-center py-20">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={20} />
          </div>
          <p className="text-[var(--text)] font-semibold mb-6">{loadError}</p>
          <button
            onClick={() => navigate(`/planner/${id}`)}
            className="btn btn-primary px-5 py-2.5 text-xs font-bold"
          >
            Back to Planner
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const hasAccepted = !!members.find((m) => m.id === user?.id)?.has_accepted_recommendation;
  const status = trip?.status || "planning";

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto px-4 sm:px-0 text-left">
        <button
          onClick={() => navigate(`/planner/${id}`)}
          className="flex items-center gap-1 text-xs text-[var(--text-dim)] bg-transparent border-none
            cursor-pointer hover:text-[var(--text)] transition-colors mb-6 p-0 font-semibold"
        >
          <ArrowLeft size={12} /> Back to Planner
        </button>

        {status === "ai_processing" ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-center py-20">
            <Loader2 size={28} className="animate-spin text-[var(--accent)] mx-auto mb-4" />
            <p className="text-[var(--text)] font-semibold text-sm mb-1">
              YatraVerse AI is picking the final destination…
            </p>
            <p className="text-[var(--text-dim)] text-xs">
              This usually takes under a minute. This page updates automatically.
            </p>
          </div>
        ) : trip?.final_destination_data ? (
          <FinalDestinationView
            trip={trip}
            data={trip.final_destination_data}
            members={members}
            onAccept={handleAccept}
            hasAccepted={hasAccepted || accepting}
          />
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-center py-20 px-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mx-auto mb-4">
              <Sparkles size={20} />
            </div>
            <p className="text-[var(--text)] font-semibold text-sm mb-1">No final destination yet</p>
            <p className="text-[var(--text-dim)] text-xs mb-6 max-w-sm mx-auto">
              {role === "admin"
                ? "Once everyone has submitted their preferences, generate the AI's final pick for the group."
                : "The trip organizer hasn't generated a final recommendation yet. Check back soon."}
            </p>
            {role === "admin" && (
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="btn btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 mx-auto"
              >
                {generating ? (
                  <><Loader2 size={14} className="animate-spin" /> Generating…</>
                ) : (
                  <><Sparkles size={14} /> Generate Final Destination</>
                )}
              </button>
            )}
            {genError && <p className="text-xs text-red-500 mt-3 font-semibold">{genError}</p>}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}