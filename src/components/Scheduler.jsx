import { Link } from "react-router-dom";

function titleCase(x = "") {
  return x
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export default function Scheduler({ vendor, course }) {
  const v = titleCase(vendor);
  const c = titleCase(course);

  return (
    <div className="schedulerLanding">
      <div className="schedulerHeader">
        <h1>{v} {c} Scheduler</h1>
        <div className="schedulerCrumb">
          {v} / {c}
        </div>
      </div>

      <div className="schedulerCard">
        <div className="schedulerGrid">

          {/* LEFT */}
          <div className="schedulerLeft">
            <h3>Technology Lab</h3>
            <div className="schedulerItem active">{v}</div>
          </div>

          {/* CENTER */}
          <div className="schedulerCenter">
            <h3>Tracks</h3>
            <div className="schedulerItem active">{c}</div>
          </div>

          {/* RIGHT */}
          <div className="schedulerRight">
            <h3>Resources</h3>

            <div className="schedulerItem">Equipment</div>
            <div className="schedulerItem">Topology</div>

            {/* THIS is the key part */}
            <Link
              to={`/scheduler-gate/${vendor}/${course}`}
              className="schedulerItem schedulerPrimary"
            >
              Scheduler
            </Link>

            <div className="schedulerItem">Rack Access Guide</div>
            <div className="schedulerItem">Buy Now</div>
          </div>
        </div>
      </div>
    </div>
  );
}
