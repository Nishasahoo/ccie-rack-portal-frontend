import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../services/api";
import { COURSES } from "../data/courses";
import ReservationModal from "../components/ReservationModal";
import MiniMonth from "../components/MiniMonth";
import "../styles/schedulerCalendar.css";
import { createBooking } from "../services/bookingApi";
 
 
// show + at every hour
const SLOT_STEP_HOURS = 1;
 
// ---------------- date helpers ----------------
function startOfWeek(d) {
  const x = new Date(d);
  const day = x.getDay(); // 0 Sun
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function fmtRange(weekStart) {
  const a = weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const b = addDays(weekStart, 6).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${a} – ${b}`;
}
function ymd(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}
function labelHour(h) {
  if (h === 0) return "Midnight";
  if (h === 12) return "Noon";
  if (h < 12) return `${h}am`;
  return `${h - 12}pm`;
}
// SAFE parser for MySQL DATETIME ("YYYY-MM-DD HH:MM:SS")
function parseMySQLDateTime(val) {
  if (!val) return null;
  // If backend ever returns ISO already, Date() can parse it.
  if (String(val).includes("T")) return new Date(val);
 
  // Convert "YYYY-MM-DD HH:MM:SS" => "YYYY-MM-DDTHH:MM:SS"
  return new Date(String(val).replace(" ", "T"));
}
// Format date range labels using parsed dates
function formatRangeLabel(startVal, endVal) {
  const s = parseMySQLDateTime(startVal);
  const e = parseMySQLDateTime(endVal);
  if (!s || !e) return "";
  const opts = { hour: "numeric", minute: "2-digit", hour12: true };
  return `${s.toLocaleTimeString(undefined, opts)} – ${e.toLocaleTimeString(undefined, opts)}`;
}
// normalize backend busy events -> ensure {start,end,status,bookingId,userId,rack}
function normalizeEvents(raw = []) {
  return (raw || [])
    .map((x) => ({
      start: x.start || x.startTime,
      end: x.end || x.endTime,
      status: x.status || "busy",
      bookingId: x.id || x.bookingId,
      userId: x.userId,
      rack: x.rack,
      vendor: x.vendor,
      course: x.course,
    }))
    .filter((x) => x.start && x.end);
}
// ✅ busy lookup per hour (click blocking)
// IMPORTANT: use parseMySQLDateTime, NOT new Date()
function buildBusyLookup(events = []) {
  const map = {};
  for (const e of events) {
    const s = parseMySQLDateTime(e.start);
    const en = parseMySQLDateTime(e.end);
    if (!s || !en) continue;
 
    const cur = new Date(s);
    cur.setMinutes(0, 0, 0);
 
    while (cur < en) {
      map[`${ymd(cur)}|${cur.getHours()}`] = true;
      cur.setHours(cur.getHours() + 1);
    }
  }
  return map;
}
// marks for MiniMonth
function buildDayMarks(events = []) {
  const marks = {};
  for (const ev of events) {
    const s = parseMySQLDateTime(ev.start);
    if (!s) continue;
    marks[ymd(s)] = "busy";
  }
  return marks;
}
// convert event time -> grid row line (header is row 1)
function rowLineFromDate(dt) {
  const h = dt.getHours();
  const m = dt.getMinutes();
  return h + (m > 0 ? m / 60 : 0);
}
function startRowLine(dt) {
  return 2 + Math.floor(rowLineFromDate(dt));
}
function endRowLine(dt) {
  const h = dt.getHours();
  const m = dt.getMinutes();
  const endH = m > 0 ? h + 1 : h;
  return 2 + endH;
}
 
export default function SchedulerPage() {
  const { slug } = useParams();
  const location = useLocation();
 
  const courseMeta = useMemo(() => {
    const s = (slug || "").toLowerCase();
    return COURSES.find((x) => (x.slug || "").toLowerCase() === s) || null;
  }, [slug]);
 
  // ✅ logged-in user (auto-fill modal)
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);
 
  // ✅ selected rack (future-ready)
  const [selectedRack, setSelectedRack] = useState("1");
 
  const [focusDate, setFocusDate] = useState(() => new Date());
  const [view, setView] = useState("week"); // week | day
 
  const [busyEvents, setBusyEvents] = useState([]);
const events = useMemo(() => {
  const now = new Date();
 
  return normalizeEvents(busyEvents).filter((ev) => {
    const end = parseMySQLDateTime(ev.end);
    return end && end >= now;   // ⬅️ hide past bookings
  });
}, [busyEvents]);
 
  const busyLookup = useMemo(() => buildBusyLookup(events), [events]);
  const miniMarks = useMemo(() => buildDayMarks(events), [events]);
 
  const [modalOpen, setModalOpen] = useState(false);
  const [slotStart, setSlotStart] = useState(null);
 const [uiError, setUiError] = useState("");
 
  const weekStart = useMemo(() => startOfWeek(focusDate), [focusDate]);
 
  const days = useMemo(() => {
    if (view === "day") return [focusDate];
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [view, focusDate, weekStart]);
 
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
 
  // ✅ load busy with rack filter
  const loadBusy = useCallback(async () => {
    if (!courseMeta) return;
 
    const start = new Date(view === "day" ? focusDate : weekStart);
    const end = view === "day" ? addDays(focusDate, 1) : addDays(weekStart, 7);
 
    try {
      const res = await api.get("/scheduler/busy", {
        params: {
          vendor: courseMeta.vendor,
          course: courseMeta.slug,
          rack: selectedRack,
          // You can send ISO ranges; backend must convert to DATETIME for SQL
          start: start.toISOString(),
          end: end.toISOString(),
        },
      });
 
      const raw = res.data?.events || res.data?.busy || res.data?.busyEvents || [];
      setBusyEvents(raw);
    } catch (e) {
      console.error("[busy:load] failed", e);
      setBusyEvents([]);
    }
  }, [courseMeta, weekStart, focusDate, view, selectedRack]);
 
  useEffect(() => {
    loadBusy();
  }, [loadBusy]);
 
  if (!courseMeta) {
    return (
      <div className="scPage">
        <div className="scHeader">
          <h1 className="scTitle">Course not found</h1>
          <div className="scCrumb">{location.pathname}</div>
        </div>
      </div>
    );
  }
 
const clickCell = (day, hour) => {
  const key = `${ymd(day)}|${hour}`;
  if (busyLookup[key]) return;
 
  const start = new Date(day);
  start.setHours(hour, 0, 0, 0);
 
  // ✅ BLOCK PAST TIME (NO BACKEND CALL)
  if (start < new Date()) {
    setUiError("You cannot book a past time slot. Please select a future slot.");
    return;
  }
 
  setUiError("");
  setSlotStart(start);
  setModalOpen(true);
};
 
 
  // const submitReservation = async ({ rack, fullName, email, phone, coupon, lengthMinutes }) => {
  //   if (!slotStart) throw new Error("Slot start missing.");
 
    // const payload = {
    //   vendor: courseMeta.vendor,
    //   course: courseMeta.slug,
    //   rack: String(rack || selectedRack),
    //   start: slotStart.toISOString(), // backend MUST convert before inserting
    //   lengthMinutes: Number(lengthMinutes),
    //   fullName,
    //   email,
    //   phone,
    //   coupon,
    // };
 
 
 const submitReservation = async ({ rack, phone, lengthMinutes }) => {
  if (!slotStart) {
    throw new Error("Slot start missing.");
  }
 
  const payload = {
  vendor: courseMeta.vendor,          // ✅ REQUIRED
  course: courseMeta.slug,            // ✅ REQUIRED
  rack: String(rack || selectedRack), // ✅ REQUIRED
  startISO: slotStart.toISOString(),  // ✅ REQUIRED
  lengthMinutes: Number(lengthMinutes) // ✅ REQUIRED
};
 
 
  const data = await createBooking(payload);
  await loadBusy();
  setModalOpen(false);
  return data;
};
 
 
  // ✅ group events by day using parseMySQLDateTime
  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const d of days) map.set(ymd(d), []);
 
    for (const ev of events) {
      const s = parseMySQLDateTime(ev.start);
      if (!s) continue;
      const key = ymd(s);
      if (map.has(key)) map.get(key).push(ev);
    }
 
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => parseMySQLDateTime(a.start) - parseMySQLDateTime(b.start));
      map.set(k, arr);
    }
    return map;
  }, [days, events]);
 
  const gridCols = useMemo(
    () => `var(--timeColWidth) repeat(${days.length}, 1fr)`,
    [days.length]
  );
 
  return (
    <div className="scPage">
      <div className="scHeader">
        <h1 className="scTitle">Scheduler</h1>
       <div className="rackGuideTitleWrap">
    <h2 className="rackGuideTitle">
    Rack Access Guide
     </h2>

  {/* <p className="rackGuideSub">
    Reserve your CCIE Data Center rack access slot easily and get instant lab scheduling support.
  </p> */}

  <a
    href="YOUR_DRIVE_LINK_HERE"
    target="_blank"
    rel="noreferrer"
    className="rackGuideLink"
  >
    View Rack Access Instructions →
  </a>
</div>
        <div className="scCrumb">{courseMeta.title} / Calendar</div>
      </div>
 
      <div className="scShell">

        <div className="scCard">
          <div className="scToolbar">
            <div className="scLeftTools">
              <button
                className="scNavBtn"
                onClick={() => setFocusDate(addDays(focusDate, view === "day" ? -1 : -7))}
              >
                ‹
              </button>
              <button
                className="scNavBtn"
                onClick={() => setFocusDate(addDays(focusDate, view === "day" ? 1 : 7))}
              >
                ›
              </button>
              <button className="scTodayBtn" onClick={() => setFocusDate(new Date())}>
                today
              </button>
            </div>
 
            <div className="scRange">
              {view === "day"
                ? focusDate.toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : fmtRange(weekStart)}
            </div>
 
            <div className="scViewToggle">
              <button className={view === "week" ? "active" : ""} onClick={() => setView("week")}>
                week
              </button>
              <button className={view === "day" ? "active" : ""} onClick={() => setView("day")}>
                day
              </button>
            </div>
          </div>
 
          <div className="scGridWrap">
            <div className="scGrid" style={{ gridTemplateColumns: gridCols }}>
              <div className="scHeadCell" />
              {days.map((d) => (
                <div className="scHeadCell" key={ymd(d)}>
                  {d.toLocaleDateString(undefined, { weekday: "short", month: "numeric", day: "numeric" })}
                </div>
              ))}
 
              {hours.map((h) => (
                <div key={h} style={{ display: "contents" }}>
                  <div className="scTimeCell">{labelHour(h)}</div>
 
                  {days.map((d) => {
                    const key = `${ymd(d)}|${h}`;
                    const busy = !!busyLookup[key];
                    const showPlus = !busy && h % SLOT_STEP_HOURS === 0;
 
                    return (
                      <div
                        key={key}
                        className={`scCell ${busy ? "isBusy" : "isFree"}`}
                        onClick={() => !busy && clickCell(d, h)}
                        title={busy ? "Busy" : "Click to reserve"}
                      >
                        {showPlus && (
                          <button
                            type="button"
                            className="scPlus"
                            onClick={(e) => {
                              e.stopPropagation();
                              clickCell(d, h);
                            }}
                            aria-label="Create reservation"
                          >
                            +
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
 
              <div className="scOverlayLayer" aria-hidden="true" style={{ gridTemplateColumns: gridCols }}>
                {days.map((d, dayIndex) => {
                  const list = eventsByDay.get(ymd(d)) || [];
                  const col = 2 + dayIndex;
 
                  return list.map((ev) => {
                    const s = parseMySQLDateTime(ev.start);
                    const e = parseMySQLDateTime(ev.end);
                    if (!s || !e) return null;
 
                    const r1 = startRowLine(s);
                    const r2 = endRowLine(e);
 
                    return (
                      <div
                        key={`${ev.bookingId || ev.start}-${ev.end}-${col}`}
                        className="scEventBlock scEventBusy"
                        style={{ gridColumn: `${col} / ${col + 1}`, gridRow: `${r1} / ${r2}` }}
                        title={formatRangeLabel(ev.start, ev.end)}
                      >
                        <div className="scEventTime">{formatRangeLabel(ev.start, ev.end)}</div>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
 
        <div className="scSide">
          <MiniMonth value={focusDate} onChange={(d) => setFocusDate(d)} marks={miniMarks} />
        </div>
      </div>
 
<ReservationModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  courseTitle={courseMeta.title}
  courseSlug={courseMeta.slug}
  startDate={slotStart}
  onSubmit={submitReservation}
  initialUser={user}
  allowedRacks={[selectedRack]}
/>
 
</div>
  );
}