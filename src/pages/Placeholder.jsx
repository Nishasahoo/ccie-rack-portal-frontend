import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const loc = useLocation();
  return (
    <section className="card">
      <h1>Page coming soon</h1>
      <p>Route: <strong>{loc.pathname}</strong></p>
    </section>
  );
}
