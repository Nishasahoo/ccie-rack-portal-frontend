import { useEffect, useMemo, useState } from "react";
import "./../styles/reservationModal.css";

function isEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isPhone(v = "") {
  const s = v.replace(/[^\d+]/g, "");
  return s.length >= 8;
}

const LENGTH_OPTIONS = [
  { label: "2 hours (120 mins)", minutes: 120, credits: 16 },
  { label: "4 hours (240 mins)", minutes: 240, credits: 30 },
  { label: "8 hours (480 mins)", minutes: 480, credits: 55 },
];

export default function ReservationModal({
  open,
  onClose,
  courseTitle,
  startDate,
  onSubmit,
  initialUser,
  allowedRacks = ["1"], // ✅ default (safe)
}) {
  const [form, setForm] = useState({
    rack: allowedRacks?.[0] ?? "1", // ✅ NEW
    fullName: "",
    email: "",
    phone: "",
    coupon: "",
    lengthMinutes: 240,
  });

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErr("");
    setLoading(false);

    setForm((s) => ({
      ...s,
      rack: allowedRacks?.[0] ?? s.rack ?? "1",
      fullName: initialUser?.fullName || s.fullName || "",
      email: initialUser?.email || s.email || "",
      phone: initialUser?.phone || s.phone || "",
    }));
  }, [open, initialUser, allowedRacks]);

  const lengthMeta = useMemo(() => {
    return LENGTH_OPTIONS.find((x) => x.minutes === Number(form.lengthMinutes)) || LENGTH_OPTIONS[1];
  }, [form.lengthMinutes]);

  const startText = useMemo(() => {
    if (!startDate) return "";
    return startDate.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [startDate]);

  const endDate = useMemo(() => {
    if (!startDate) return null;
    const mins = Number(form.lengthMinutes) || 0;
    return new Date(startDate.getTime() + mins * 60 * 1000);
  }, [startDate, form.lengthMinutes]);

  const endText = useMemo(() => {
    if (!endDate) return "";
    return endDate.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [endDate]);

  const submit = async () => {
    setErr("");

    if (!startDate) return setErr("Start time missing. Please select a slot again.");
    if (!form.rack) return setErr("Rack is required."); // ✅ NEW
    if (!form.fullName.trim()) return setErr("Full name is required.");
    if (!isEmail(form.email)) return setErr("Enter a valid email.");
    if (!isPhone(form.phone)) return setErr("Enter a valid phone number.");

    setLoading(true);
    try {
      await onSubmit({
        rack: String(form.rack), // ✅ NEW
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        coupon: form.coupon.trim(),
        lengthMinutes: Number(form.lengthMinutes),
      });
      onClose();
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Failed to submit reservation.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="rmOverlay" role="dialog" aria-modal="true">
      <div className="rmModal">
        <div className="rmTop">
          <div>
            <div className="rmTitle">New Reservation</div>
            <div className="rmSub">{courseTitle}</div>
          </div>
          <button className="rmClose" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="rmBody">
          {/* ✅ Rack (REQUIRED) */}
          <label className="rmLabel">Rack *</label>
          <select
            className="rmInput"
            value={form.rack}
            onChange={(e) => setForm((s) => ({ ...s, rack: e.target.value }))}
          >
            {allowedRacks.map((r) => (
              <option key={r} value={r}>
                Rack {r}
              </option>
            ))}
          </select>

          <div className="rmRow2">
            <div>
              <label className="rmLabel">Start</label>
              <input className="rmInput" value={startText} readOnly />
            </div>

            <div>
              <label className="rmLabel">Length *</label>
              <select
                className="rmInput"
                value={form.lengthMinutes}
                onChange={(e) =>
                  setForm((s) => ({ ...s, lengthMinutes: Number(e.target.value) }))
                }
              >
                {LENGTH_OPTIONS.map((o) => (
                  <option key={o.minutes} value={o.minutes}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className="rmHint">
                Price: <b>{lengthMeta.credits} credits</b>
              </div>
            </div>
          </div>

          <div className="rmRow1">
            <label className="rmLabel">End (auto)</label>
            <input className="rmInput" value={endText} readOnly />
          </div>

          <label className="rmLabel">Full name *</label>
          <input
            className="rmInput"
            value={form.fullName}
            onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
            placeholder="Your name"
          />

          <div className="rmRow2">
            <div>
              <label className="rmLabel">Email *</label>
              <input
                className="rmInput"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="rmLabel">Phone *</label>
              <input
                className="rmInput"
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                placeholder="e.g. 9840..."
              />
            </div>
          </div>

          <label className="rmLabel">Coupon code (optional)</label>
          <input
            className="rmInput"
            value={form.coupon}
            onChange={(e) => setForm((s) => ({ ...s, coupon: e.target.value }))}
            placeholder="COUPON2026"
          />

          {err && <div className="rmErr">{err}</div>}

          <div className="rmActions">
            <button className="rmBtn ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="rmBtn" onClick={submit} disabled={loading}>
              {loading ? "Submitting..." : "Create reservation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
