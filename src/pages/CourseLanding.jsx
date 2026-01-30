import { Link, useParams } from "react-router-dom";
import { COURSES } from "../data/courses";
import "../styles/page.css";

export default function CourseLanding() {
  const { id } = useParams(); // route should be /course/:id

  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="card">
        <h2>Course not found</h2>
        <p>Invalid course id: {id}</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="pageWrap">
      <div className="pageHeaderCard">
        <h1 className="pageBigTitle">{course.title}</h1>
        <p className="muted">
          Vendor: <b>{course.vendor}</b>
        </p>
      </div>

      <div className="card">
        <h3>Actions</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn" to={`/gate${course.schedulerPath}?courseId=${course.id}`}>
            Open Scheduler
          </Link>
          <Link className="btnOutline" to="/">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
