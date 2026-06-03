import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ clear autofill on mount
useEffect(() => {

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    token &&
    user &&
    user.role === "admin"
  ) {

    nav("/admin", {
      replace: true,
    });

  }

}, [nav]);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const { user, token } = res.data;

      // ❌ BLOCK NON-ADMINS
      if (!user || user.role !== "admin") {
        setMsg("Unauthorized: Admin access only");
        return;
      }

      // ✅ save admin session
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      nav("/admin", { replace: true });
    } catch (err) {
      setMsg(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authWrap">
      <div className="authCard">
        <h1 className="authTitle">Admin Login</h1>
        <p className="authSub">Authorized personnel only</p>

        {msg && <div className="authMsg">{msg}</div>}

        <form
          onSubmit={submit}
          className="authForm"
          autoComplete="off"
        >
          <label className="authLabel">
            Email
            <input
              name="admin_email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="authInput"
              type="email"
              autoComplete="off"
              autoCapitalize="none"
              required
            />
          </label>

          <label className="authLabel">
            Password
            <input
              name="admin_password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="authInput"
              type="password"
              autoComplete="new-password"
              required
            />
          </label>

          <button className="authBtn" disabled={loading}>
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
