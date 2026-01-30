import { useParams } from "react-router-dom";
import Scheduler from "../components/Scheduler.jsx";
import "../styles/page.css";

export default function Cisco() {
  const { course } = useParams(); // e.g. "security", "wireless", "data-center"

  return (
    <div className="pageWrap">
      {/* Always show the scheduler landing UI.
          Login will happen ONLY on /scheduler-gate/:vendor/:course */}
      <Scheduler vendor="cisco" course={course} />
    </div>
  );
}
