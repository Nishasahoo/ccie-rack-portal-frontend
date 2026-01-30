import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function isValidEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();

  const next = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("next") || "/";
  }, [location.search]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const email = form.email.trim();
    const password = form.password;

    if (!isValidEmail(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // ✅ baseURL already includes /api
      const res = await api.post("/auth/login", { email, password });

      if (res.data?.token) localStorage.setItem("token", res.data.token);
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      const isSchedulerSlug =
        next.startsWith("/") && !next.includes("/calendar") && next !== "/login";

      if (isSchedulerSlug && next !== "/") {
        nav(`${next}/calendar`, { replace: true });
      } else {
        nav(next, { replace: true });
      }
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authWrap">
      <div className="authCard">
        <h1 className="authTitle">User Login</h1>
        <p className="authSub">Login to check credits and book rack slots.</p>

        {msg && <div className="authMsg">{msg}</div>}

        <form onSubmit={submit} className="authForm">
          <label className="authLabel">
            Email
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="authInput"
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="authLabel">
            Password
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              className="authInput"
              type="password"
              placeholder="******"
              autoComplete="current-password"
              required
            />
          </label>

          <button className="authBtn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div style={{ marginTop: 14, textAlign: "center" }}>
          <Link to={`/forgot-password?next=${encodeURIComponent(next)}`}>
            Lost password?
          </Link>
          {"  "}·{"  "}
          <Link to={`/register?next=${encodeURIComponent(next)}`}>
            Create a new user account
          </Link>
        </div>

        <p className="authHint">
          (Office use) If you don’t have an account, admin will create it.
        </p>
      </div>
    </div>
  );
}
