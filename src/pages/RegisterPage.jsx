import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

/* ---------------- helpers ---------------- */

function isValidEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isStrongPassword(v = "") {
  return v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);
}

/* ---------------- component ---------------- */

export default function RegisterPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from") || "";
  const backTo = useMemo(() => (from ? `/${from}` : "/"), [from]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 1️⃣ validate form */
  function validateForm() {
    if (!isValidEmail(form.email)) {
      return "Please enter a valid email address.";
    }
    if (!isStrongPassword(form.password)) {
      return "Password must be at least 8 characters and include a letter and number.";
    }
    return null;
  }

  /* 2️⃣ build payload (Postman-friendly) */
  function buildPayload() {
    return {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
    };
  }

  /* 3️⃣ call signup API */
  async function signupUser(payload) {
    return api.post("/auth/register", payload);
  }

  /* 4️⃣ handle backend response */
  function handleSignupResponse(data) {
    if (data.approved) {
      // approved → go to login
      navigate(backTo, { replace: true });
    } else {
      // pending approval
      navigate(`/account-pending?from=${encodeURIComponent(from)}`, {
        replace: true,
      });
    }
  }

  /* 5️⃣ submit handler */
  async function submit(e) {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = buildPayload();
      const res = await signupUser(payload);
      handleSignupResponse(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h1>Create account</h1>
      <p style={{ color: "#666" }}>
        After registration, admin approval may be required.
      </p>

      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          required
        />

        {error && (
          <div style={{ color: "crimson", background: "#ffecec", padding: 10 }}>
            {error}
          </div>
        )}

        <button disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>

        <button type="button" onClick={() => navigate(backTo)}>
          Back to login
        </button>
      </form>
    </div>
  );
}
