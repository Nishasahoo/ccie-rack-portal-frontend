import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { COURSES } from "../data/courses";
import "../styles/schedulerGate.css";

function formatRackMessage(racks = []) {
  if (!racks.length) return "";
  if (racks.length === 1) return `Rack ${racks[0]} is currently not available for booking`;
  if (racks.length === 2) return `Rack ${racks[0]} and Rack ${racks[1]} are currently not available for booking`;
  return `Racks ${racks.slice(0, -1).join(", ")} and ${racks[racks.length - 1]} are currently not available for booking`;
}

function isValidEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function SchedulerGate() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [busyRacks, setBusyRacks] = useState([]);

  const courseMeta = useMemo(() => {
    const s = (slug || "").toLowerCase();
    return COURSES.find((x) => (x.slug || "").toLowerCase() === s) || null;
  }, [slug]);

  const pageTitle = useMemo(() => {
    if (!courseMeta) return "Scheduler";
    return `${courseMeta.title} Scheduler`;
  }, [courseMeta]);

  const breadcrumb = useMemo(() => {
    if (!courseMeta) return "Login";
    return `${courseMeta.title} / Login`;
  }, [courseMeta]);

  const loginHeading = useMemo(() => {
    if (courseMeta?.loginTitle) return courseMeta.loginTitle;
    if (courseMeta?.title) return `Log into ${courseMeta.title} schedule`;
    return "Log in";
  }, [courseMeta]);

  const busyWindow = useMemo(() => {
    const start = new Date();
    const end = new Date(Date.now() + 2 * 60 * 60 * 1000);
    return { start, end };
  }, []);

  useEffect(() => {
    if (!courseMeta) return;

    (async () => {
      try {
        // ✅ FIX: NO "/api" here
        const res = await api.get("/scheduler/busy", {
          params: {
            vendor: courseMeta.vendor,
            course: courseMeta.slug,
            start: busyWindow.start.toISOString(),
            end: busyWindow.end.toISOString(),
            tzOffsetMinutes: new Date().getTimezoneOffset(),
          },
        });

        const racks = res.data?.busyRacks || res.data?.racks || res.data?.busy || [];
        setBusyRacks(Array.isArray(racks) ? racks : []);
      } catch {
        setBusyRacks([]);
      }
    })();
  }, [courseMeta, busyWindow]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const email = form.username.trim();
    const password = form.password;

    if (!isValidEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // ✅ FIX: NO "/api" here
      const res = await api.post("/auth/login", { email, password });

      if (res.data?.code === "ACCOUNT_NOT_APPROVED") {
        navigate(`/account-pending?from=${encodeURIComponent(slug || "")}`, { replace: true });
        return;
      }

      if (res.data?.token) localStorage.setItem("token", res.data.token);
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(`/${slug}/calendar`, { replace: true });
    } catch (ex) {
      const code = ex?.response?.data?.code;
      if (code === "ACCOUNT_NOT_APPROVED") {
        navigate(`/account-pending?from=${encodeURIComponent(slug || "")}`, { replace: true });
        return;
      }

      setErr(ex?.response?.data?.message || `Login failed (${ex?.response?.status || "no response"})`);
    } finally {
      setLoading(false);
    }
  };

  if (!courseMeta) {
    return (
      <div className="sgPage">
        <div className="sgHeader">
          <h1 className="sgTitle">Course not found</h1>
          <div className="sgCrumb">{location.pathname}</div>
        </div>

        <div className="sgCard">
          <p className="sgMuted">Invalid route.</p>
          <Link className="sgBtn" to="/">Go Home</Link>
        </div>
      </div>
    );
  }

  const busyMsg = formatRackMessage(busyRacks);

  return (
    <div className="sgPage">
      {!!busyMsg && (
        <div className="sgBusyBanner">
          <span className="sgNoIcon">🚫</span>
          <span className="sgBusyText">{busyMsg}</span>
          <span className="sgNoIcon">🚫</span>
        </div>
      )}

      <div className="sgHeader">
        <h1 className="sgTitle">{pageTitle}</h1>
        <div className="sgCrumb">{breadcrumb}</div>
      </div>

      <div className="sgCard">
        <div className="sgCardInner">
          <div className="sgLoginTop">
            <div className="sgGreenBar">Please log in</div>
            <h2 className="sgLoginHeading">{loginHeading}</h2>
          </div>

          <h3 className="sgFormTitle">User Login</h3>

          <form className="sgForm" onSubmit={submit}>
            <label className="sgLabel">Login name:</label>
            <input
              className="sgInput"
              value={form.username}
              onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
              autoComplete="username"
              placeholder="you@example.com"
              required
            />

            <label className="sgLabel">Password:</label>
            <input
              className="sgInput"
              type="password"
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
              autoComplete="current-password"
              required
            />

            {err && <div className="sgError">{err}</div>}

            <button className="sgBtn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="sgLinks">
            <Link to={`/register?from=${encodeURIComponent(slug || "")}`}>Create a new user account</Link>
            <Link to={`/forgot-password?from=${encodeURIComponent(slug || "")}`}>Lost password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
