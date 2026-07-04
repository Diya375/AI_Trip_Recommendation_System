import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
  Copy,
  Check,
  Link2,
  ArrowLeft,
  Users,
  Wallet,
  Compass,
  Utensils,
  Hotel,
  StickyNote,
  Sparkles,
  Loader2,
  ClipboardList,
  Hourglass,
} from "lucide-react";
import TripPlaces from "../components/TripPlaces";

const TRIP_TYPES = ["Adventure", "Hiking", "Trekking", "Relaxing", "Cultural", "Beach", "Wildlife", "Road Trip"];
const FOOD_OPTIONS = ["No preference", "Vegetarian", "Non-Vegetarian", "Vegan", "Halal"];
const ACCOMMODATION_OPTIONS = ["No preference", "Hotel", "Camping", "Homestay", "Resort", "Hostel"];

// Small, cohesive palette that sits next to --accent without clashing
const AVATAR_PALETTE = ["#2f6f5e", "#b8863b", "#7d5a8c", "#3c6e8f", "#a85c48", "#5c7a3f"];
function avatarColor(seed = "") {
  const code = seed.charCodeAt(0) || 0;
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

export default function Planner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [trip, setTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [role, setRole] = useState("");
  const [preferences, setPreferences] = useState(null);
  const [allPreferences, setAllPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [budget, setBudget] = useState("");
  const [tripTypes, setTripTypes] = useState([]);
  const [food, setFood] = useState("No preference");
  const [accommodation, setAccommodation] = useState("No preference");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login", { state: { redirectTo: location.pathname } }); return; }

    if (!id) { navigate("/planner"); return; }

    Promise.all([
      API.get(`/trips/${id}`),
      API.get(`/trips/${id}/preferences`)
    ])
      .then(([tripRes, prefRes]) => {
        setTrip(tripRes.data.trip);
        setMembers(tripRes.data.members);
        setRole(prefRes.data.role);

        if (prefRes.data.role === "admin") {
          setAllPreferences(prefRes.data.preferences);
        } else {
          const pref = prefRes.data.preferences;
          if (pref) {
            setBudget(pref.budget || "");
            setTripTypes(pref.trip_types || []);
            setFood(pref.food_preference || "No preference");
            setAccommodation(pref.accommodation || "No preference");
            setNotes(pref.notes || "");
            setPreferences(pref);
          }
        }
      })
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [id, navigate, location.pathname]);

  const inviteLink = trip ? `${window.location.origin}/join/${trip.invite_code}` : "";

  const toggleTripType = (type) => {
    setTripTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await API.post(`/trips/${id}/preferences`, {
        budget: parseInt(budget) || null,
        trip_types: tripTypes,
        food_preference: food,
        accommodation,
        notes,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (role === "admin") {
        const prefRes = await API.get(`/trips/${id}/preferences`);
        setAllPreferences(prefRes.data.preferences);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  const handleSendToAI = () => {
    navigate(`/assistant`, {
      state: { tripId: id, tripName: trip?.name, preferences: allPreferences, members },
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center gap-2 text-[var(--text-dim)] py-12">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading trip…</span>
        </div>
      </DashboardLayout>
    );
  }

  const membersWithoutPrefs = members.filter(
    (m) => !allPreferences.find((p) => p.user_id === m.id)
  );
  const submittedCount = members.length - membersWithoutPrefs.length;
  const progressPct = members.length ? Math.round((submittedCount / members.length) * 100) : 0;

  return (
    <DashboardLayout>
      {/* keyframes Tailwind's arbitrary animate-[...] utilities hook into */}
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-6 mb-9">
        <div className="min-w-0">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-1.5 text-[var(--text-dim)] hover:text-[var(--accent)] text-sm mb-3 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>

          <h2 className="cinzel text-3xl leading-tight text-[var(--accent)] m-0">
            {trip?.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            {members.length > 0 && (
              <div className="flex">
                {members.slice(0, 5).map((m) => (
                  <div
                    key={m.id}
                    title={m.name}
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[0.65rem] font-semibold text-white border-2 border-[var(--bg)] -ml-2 first:ml-0"
                    style={{ background: avatarColor(m.name || "?") }}
                  >
                    {m.name?.charAt(0).toUpperCase()}
                  </div>
                ))}
                {members.length > 5 && (
                  <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[0.65rem] font-semibold text-[var(--text-dim)] bg-[var(--border)] border-2 border-[var(--bg)] -ml-2">
                    +{members.length - 5}
                  </div>
                )}
              </div>
            )}
            <span className="text-sm text-[var(--text-dim)]">
              {members.length} member{members.length !== 1 ? "s" : ""}
            </span>
            <span
              className={`text-[0.7rem] uppercase tracking-wide px-2.5 py-0.5 rounded-full ${
                role === "admin" ? "bg-[var(--accent)] text-white" : "bg-[var(--border)] text-[var(--text-dim)]"
              }`}
            >
              {role === "admin" ? "Admin" : "Member"}
            </span>
          </div>
        </div>

        {role === "admin" && allPreferences.length > 0 && (
          <button
            onClick={handleSendToAI}
            className="btn btn-primary inline-flex items-center gap-2 px-6 py-3 text-[0.88rem] shadow-[0_4px_14px_color-mix(in_srgb,var(--accent)_35%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_color-mix(in_srgb,var(--accent)_45%,transparent)] transition-all"
          >
            <Sparkles size={16} />
            Send to AI Assistant
          </button>
        )}
      </div>

      {/* ── ADMIN VIEW ── */}
      {role === "admin" && (
        <>
          {/* Invite link */}
          {inviteLink && (
            <div className="card flex flex-wrap items-center gap-4 mb-6 px-5 py-4 border border-dashed border-[var(--border)]">
              <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]">
                <Link2 size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.7rem] uppercase tracking-wide text-[var(--text-dim)] mb-0.5">
                  Invite link
                </p>
                <span className="text-[0.82rem] font-mono text-[var(--text)] break-all">
                  {inviteLink}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className={`btn ${copiedLink ? "bg-[var(--accent)] text-white opacity-85" : "btn-primary"} flex items-center gap-1.5 px-4 py-2 text-[0.82rem] flex-shrink-0 whitespace-nowrap w-full sm:w-auto justify-center`}
              >
                {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>
          )}

          {/* Progress toward full response */}
          {members.length > 0 && (
            <div className="card mb-8">
              <div className="flex items-baseline justify-between mb-2.5">
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--text)] m-0">
                  <ClipboardList size={16} className="text-[var(--accent)]" />
                  Preferences collected
                </p>
                <span className="text-[0.8rem] text-[var(--text-dim)]">
                  {submittedCount} of {members.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {membersWithoutPrefs.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="flex items-center gap-1.5 text-[0.78rem] text-[var(--text-dim)]">
                    <Hourglass size={13} /> Waiting on:
                  </span>
                  {membersWithoutPrefs.map((m) => (
                    <span key={m.id} className="text-[0.78rem] px-3 py-1 rounded-full bg-[var(--border)] text-[var(--text-dim)]">
                      {m.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All preferences */}
          {allPreferences.length === 0 ? (
            <div className="card text-center py-14 px-8 mb-10">
              <div className="w-14 h-14 rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] flex items-center justify-center mx-auto mb-4">
                <ClipboardList size={24} className="text-[var(--accent)]" />
              </div>
              <p className="cinzel text-[var(--text)] text-lg mb-1.5">No responses yet</p>
              <p className="text-[var(--text-dim)] text-[0.88rem] max-w-[360px] mx-auto">
                Share the invite link above so members can join and tell you what they're hoping for.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 mb-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {allPreferences.map((pref, i) => (
                <div
                  key={pref.user_id}
                  className="card transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg animate-[fadeUp_0.4s_ease_both]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                      style={{ background: avatarColor(pref.name || "?") }}
                    >
                      {pref.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--text)] m-0">{pref.name}</p>
                      <p className="text-xs text-[var(--text-dim)] m-0 truncate">{pref.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <PrefRow icon={<Wallet size={15} />} label="Budget" value={pref.budget ? `Rs. ${pref.budget.toLocaleString()}` : "Not specified"} />
                    <PrefRow icon={<Compass size={15} />} label="Trip type" value={pref.trip_types?.length ? pref.trip_types.join(", ") : "Not specified"} />
                    <PrefRow icon={<Utensils size={15} />} label="Food" value={pref.food_preference || "Not specified"} />
                    <PrefRow icon={<Hotel size={15} />} label="Stay" value={pref.accommodation || "Not specified"} />
                    {pref.notes && <PrefRow icon={<StickyNote size={15} />} label="Notes" value={pref.notes} />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Admin's own preferences */}
          <div className="mt-10">
            <SectionHeading icon={<Users size={16} />} title="Your Preferences" />
            <PreferenceForm
              budget={budget} setBudget={setBudget}
              tripTypes={tripTypes} toggleTripType={toggleTripType}
              food={food} setFood={setFood}
              accommodation={accommodation} setAccommodation={setAccommodation}
              notes={notes} setNotes={setNotes}
              onSave={handleSave} saving={saving} saved={saved}
            />
          </div>

          <div className="mt-10">
            <TripPlaces tripId={id} />
          </div>
        </>
      )}

      {/* ── MEMBER VIEW ── */}
      {role === "member" && (
        <div className="max-w-xl">
          <div
            className={`flex items-center gap-2.5 text-sm text-[var(--text)] rounded-xl px-4.5 py-3.5 mb-7 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] border border-[color-mix(in_srgb,var(--accent)_25%,transparent)] [&_svg]:text-[var(--accent)] [&_svg]:flex-shrink-0 ${
              preferences ? "opacity-90" : ""
            }`}
          >
            {preferences ? <Check size={16} /> : <Compass size={16} />}
            <span>
              {preferences
                ? "Your preferences are saved — update them anytime before the trip is planned."
                : "Fill in your preferences so the admin can plan the perfect trip for everyone."}
            </span>
          </div>

          <PreferenceForm
            budget={budget} setBudget={setBudget}
            tripTypes={tripTypes} toggleTripType={toggleTripType}
            food={food} setFood={setFood}
            accommodation={accommodation} setAccommodation={setAccommodation}
            notes={notes} setNotes={setNotes}
            onSave={handleSave} saving={saving} saved={saved}
          />

          <div className="mt-10">
            <TripPlaces tripId={id} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function SectionHeading({ icon, title }) {
  return (
    <h3 className="cinzel text-lg text-[var(--text)] mb-5 flex items-center gap-2">
      <span className="text-[var(--accent)] inline-flex">{icon}</span>
      {title}
    </h3>
  );
}

function PrefRow({ icon, label, value }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-[var(--accent)] flex-shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-[0.68rem] uppercase tracking-wide text-[var(--text-dim)] m-0">{label}</p>
        <p className="text-sm text-[var(--text)] m-0 break-words">{value}</p>
      </div>
    </div>
  );
}

function PreferenceForm({ budget, setBudget, tripTypes, toggleTripType, food, setFood, accommodation, setAccommodation, notes, setNotes, onSave, saving, saved }) {
  const chipBase =
    "px-4 py-1.5 rounded-full border text-[0.85rem] transition-all duration-150 font-inherit hover:-translate-y-0.5";
  const chipInactive = "border-[var(--border)] bg-transparent text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]";
  const chipActive = "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_3px_10px_color-mix(in_srgb,var(--accent)_35%,transparent)]";

  return (
    <div className="card flex flex-col gap-7">
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)] mb-3 [&_svg]:text-[var(--accent)]">
          <Wallet size={13} /> Budget
        </label>
        <div className="flex items-center border border-[var(--border)] rounded-[10px] bg-[var(--bg)] overflow-hidden focus-within:border-[var(--accent)] transition-colors">
          <span className="pl-4 text-[var(--text-dim)] text-[0.9rem]">Rs.</span>
          <input
            type="number"
            placeholder="15,000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="0"
            className="flex-1 border-none bg-transparent outline-none py-3 pr-4 pl-1.5 text-[var(--text)] text-[0.95rem] font-inherit"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)] mb-3 [&_svg]:text-[var(--accent)]">
          <Compass size={13} /> Trip type
          <span className="normal-case tracking-normal font-normal opacity-60">· select all that apply</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TRIP_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleTripType(type)}
              className={`${chipBase} ${tripTypes.includes(type) ? chipActive : chipInactive}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)] mb-3 [&_svg]:text-[var(--accent)]">
          <Utensils size={13} /> Food preference
        </label>
        <div className="flex flex-wrap gap-2">
          {FOOD_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setFood(option)}
              className={`${chipBase} ${food === option ? chipActive : chipInactive}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)] mb-3 [&_svg]:text-[var(--accent)]">
          <Hotel size={13} /> Accommodation
        </label>
        <div className="flex flex-wrap gap-2">
          {ACCOMMODATION_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setAccommodation(option)}
              className={`${chipBase} ${accommodation === option ? chipActive : chipInactive}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)] mb-3 [&_svg]:text-[var(--accent)]">
          <StickyNote size={13} /> Additional notes
        </label>
        <textarea
          placeholder="Any specific places, requirements or things you'd like to do…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-[10px] px-4 py-3.5 text-[var(--text)] text-sm resize-y font-inherit box-border focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="btn btn-primary flex items-center justify-center gap-2 py-3.5 text-base transition-all disabled:opacity-70 disabled:cursor-default enabled:hover:-translate-y-0.5"
      >
        {saving ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Saving…
          </>
        ) : saved ? (
          <>
            <Check size={16} /> Saved
          </>
        ) : (
          "Save Preferences"
        )}
      </button>
    </div>
  );
}