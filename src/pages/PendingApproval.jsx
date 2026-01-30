import { Link, useLocation } from "react-router-dom";

export default function PendingApproval() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email") || "";

  return (
    <div style={{ maxWidth: 700, margin: "80px auto", padding: 24 }}>
      <h1>Account pending approval</h1>
      <p>
        Your account <b>{email}</b> is created successfully, but admin approval is required
        before you can login.
      </p>
      <p>Please wait. You will get access after approval.</p>

      <Link to="/">Go Home</Link>
    </div>
  );
}