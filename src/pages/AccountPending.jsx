import { Link, useSearchParams } from "react-router-dom";
import "../styles/schedulerGate.css";

export default function AccountPending() {
  const [sp] = useSearchParams();
  const from = sp.get("from") || "";

  return (
    <div className="sgPage">
      <div className="sgHeader">
        <h1 className="sgTitle">Account pending approval</h1>
        <div className="sgCrumb">Verification</div>
      </div>

      <div className="sgCard">
        <div className="sgCardInner">
          <div className="sgOk" style={{ marginBottom: 12 }}>
            Your account was created successfully.
          </div>

          <p className="sgMuted" style={{ lineHeight: 1.6 }}>
            An admin must approve your account before you can log in.
            <br />
            You will receive an email once approved.
          </p>

          <div className="sgLinks" style={{ marginTop: 18 }}>
            <Link to={from ? `/${from}` : "/"}>Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
