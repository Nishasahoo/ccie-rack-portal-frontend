import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import "../styles/schedulerGate.css";
import { COUNTRY_LIST, TIMEZONES } from "../data/geo";

function isValidEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// min 8 chars + letter + number
function isStrongPassword(v = "") {
  const s = (v || "").trim();
  return s.length >= 8 && /[A-Za-z]/.test(s) && /\d/.test(s);
}

export default function Register() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const from = sp.get("from") || "";
  const backTo = useMemo(() => (from ? `/${from}` : "/"), [from]);

  const [form, setForm] = useState({
    loginName: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    country: "India",
    timeZone: "Asia/Kolkata",
  });

  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    const loginName = form.loginName.trim();
    const email = (form.email || "").trim() || loginName;

    if (!loginName) return setErr("Login name is required.");
    if (!isValidEmail(email)) return setErr("Enter a valid email address.");

    if (!isStrongPassword(form.password)) {
      return setErr("Password must be at least 8 characters and include a letter + number.");
    }

    if (form.password !== confirm) return setErr("Passwords do not match.");
    if (!form.country) return setErr("Please select a country.");
    if (!form.timeZone) return setErr("Please select a time zone.");

    setLoading(true);
    try {
      // ✅ IMPORTANT: baseURL already has /api, so DO NOT write /api here
      await api.post("/auth/register", {
        loginName, // optional if backend stores it
        fullName: form.fullName.trim(),
        email,
        password: form.password,
        phone: form.phone.trim(),
        address: form.address.trim(),
        country: form.country,
        timezone: form.timeZone, // ✅ use timezone key (backend usually expects this)
      });

      setOk("Account created. Waiting for admin approval…");

      setTimeout(() => {
        navigate(`/account-pending?from=${encodeURIComponent(from)}`, { replace: true });
      }, 700);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sgPage">
      <div className="sgHeader">
        <h1 className="sgTitle">Create a new user account</h1>
        <div className="sgCrumb">Register</div>
      </div>

      <div className="sgCard">
        <div className="sgCardInner">
          <form className="sgForm" onSubmit={submit}>
            <label className="sgLabel">Login name *</label>
            <input
              className="sgInput"
              value={form.loginName}
              onChange={set("loginName")}
              placeholder="you@example.com"
              autoComplete="username"
              required
            />
            <div className="sgMuted" style={{ marginTop: -6 }}>
              You can use an email address as the login name.
            </div>

            <label className="sgLabel">Password *</label>
            <input
              className="sgInput"
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="Min 8 chars, letter + number"
              autoComplete="new-password"
              required
            />

            <label className="sgLabel">Confirm password *</label>
            <input
              className="sgInput"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />

            <label className="sgLabel">Full name</label>
            <input
              className="sgInput"
              value={form.fullName}
              onChange={set("fullName")}
              placeholder="Your name"
            />

            <label className="sgLabel">Email *</label>
            <input
              className="sgInput"
              value={form.email}
              onChange={set("email")}
              placeholder="(If different from login name)"
              autoComplete="email"
            />

            <label className="sgLabel">Phone</label>
            <input
              className="sgInput"
              value={form.phone}
              onChange={set("phone")}
              placeholder="+1 555 000 0000"
              autoComplete="tel"
            />

            <label className="sgLabel">Address</label>
            <textarea
              className="sgInput"
              value={form.address}
              onChange={set("address")}
              rows={3}
              placeholder="Street, City, State"
            />

            <label className="sgLabel">Country *</label>
            <select className="sgInput" value={form.country} onChange={set("country")} required>
              <option value="">Select country</option>
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="sgLabel">Time zone *</label>
            <select className="sgInput" value={form.timeZone} onChange={set("timeZone")} required>
              <option value="">Select timezone</option>
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>

            {err && <div className="sgError">{err}</div>}
            {ok && <div className="sgOk">{ok}</div>}

            <button className="sgBtn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>

            <div className="sgLinks" style={{ justifyContent: "center" }}>
              <button type="button" className="sgLinkBtn" onClick={() => navigate(backTo)}>
                Back to login
              </button>
            </div>

            <div className="sgMuted" style={{ textAlign: "center", marginTop: 8 }}>
              Password must be at least 8 characters and include a letter + number.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
