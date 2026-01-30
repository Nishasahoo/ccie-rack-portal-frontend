import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import "../styles/schedulerGate.css";

function isValidEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const from = sp.get("from") || ""; // slug
  const backTo = useMemo(() => (from ? `/${from}` : "/"), [from]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    const clean = email.trim();
    if (!isValidEmail(clean)) {
      setErr("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // When backend is ready:
      // await api.post("/api/auth/forgot-password", { email: clean });

      setOk("If the email exists, we sent a reset link.");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sgPage">
      <div className="sgHeader">
        <h1 className="sgTitle">Lost password?</h1>
        <div className="sgCrumb">Forgot password</div>
      </div>

      <div className="sgCard">
        <div className="sgCardInner">
          <form className="sgForm" onSubmit={submit}>
            <label className="sgLabel">Email:</label>
            <input
              className="sgInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              required
            />

            {err && <div className="sgError">{err}</div>}
            {ok && <div className="sgOk">{ok}</div>}

            <button className="sgBtn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <div className="sgLinks" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="sgLinkBtn"
                onClick={() => navigate(backTo)}
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
