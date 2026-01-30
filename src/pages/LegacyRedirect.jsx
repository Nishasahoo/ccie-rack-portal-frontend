// frontend/src/pages/LegacyRedirect.jsx
import { useMemo } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { COURSES } from "../data/courses";

export default function LegacyRedirect() {
  const { vendor, course } = useParams();
  const location = useLocation();

  const target = useMemo(() => {
    const v = (vendor || "").toLowerCase();
    const c = (course || "").toLowerCase();

    // Map old {vendor, course} to new {slug}
    // Here "course" is old track name like "security", "ei", "wireless", "datacenter"
    const map = {
      cisco: {
        ei: "ei-scheduler",
        security: "security-scheduler",
        wireless: "wireless-scheduler",
        datacenter: "datacenter-scheduler",
      },
      fortinet: {
        fcx: "fcx-scheduler",
      },
    };

    const slug = map?.[v]?.[c];
    if (slug) return `/${slug}`;

    // fallback: try find by vendor/course name in title or slug
    const found = COURSES.find(
      (x) =>
        x.vendor === v &&
        (x.slug.includes(c) || (x.title || "").toLowerCase().includes(c))
    );

    return found ? `/${found.slug}` : "/";
  }, [vendor, course]);

  return <Navigate to={target} replace state={{ from: location.pathname }} />;
}
