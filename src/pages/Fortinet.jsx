import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VendorScheduler from "../components/Scheduler.jsx"; // renamed
import api from "../services/api";
import "../styles/page.css";

export default function Fortinet() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/auth/me");
        setMe(res.data);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  return (
    <div className="pageWrap">
      {!me && <div className="loginBanner"><span>Please log in</span></div>}

      <div className="pageHeaderCard">
        <div className="breadcrumbRow">
          <span className="crumbHome">🏠</span>
          <span className="crumbSep">›</span>
          <span className="crumbText">Fortinet Scheduler</span>
        </div>

        <h1 className="pageBigTitle">Log into Fortinet schedule</h1>

        {!me ? (
          <div className="loginBox">
            <h2>User Login</h2>
            <p className="muted">Please login to open scheduler and book rack.</p>
            <Link className="primaryBtn" to="/login">Go to Login</Link>
          </div>
        ) : (
          <VendorScheduler vendor="Fortinet" course="Fortinet" />
        )}
      </div>
    </div>
  );
}
