import "./../styles/miniMonth.css";

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function ymd(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

export default function MiniMonth({
  value,
  onChange,
  marks = {}, // { "2026-01-13": "busy" | "pending" | "reserved" }
}) {
  const monthStart = startOfMonth(value);
  const monthEnd = endOfMonth(value);

  const firstDay = monthStart.getDay(); // 0 Sun
  const daysInMonth = monthEnd.getDate();

  const weeks = [];
  let dayNum = 1 - firstDay;
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let i = 0; i < 7; i++) {
      const cellDate = new Date(value.getFullYear(), value.getMonth(), dayNum);
      const inMonth = cellDate.getMonth() === value.getMonth();
      const key = ymd(cellDate);
      row.push({ date: cellDate, inMonth, key });
      dayNum++;
    }
    weeks.push(row);
  }

  return (
    <div className="mmCard">
      <div className="mmTop">
        <div className="mmTitle">Calendar</div>
        <div className="mmMonthRow">
          <div className="mmMonthName">
            {value.toLocaleString(undefined, { month: "long", year: "numeric" })}
          </div>
          <div className="mmNav">
            <button onClick={() => onChange(addMonths(value, -1))}>‹</button>
            <button onClick={() => onChange(addMonths(value, 1))}>›</button>
          </div>
        </div>
      </div>

      <div className="mmGrid">
        {"Su Mo Tu We Th Fr Sa".split(" ").map((x) => (
          <div className="mmDow" key={x}>{x}</div>
        ))}

        {weeks.flat().map((c) => {
          const status = marks[c.key];
          return (
            <button
              key={c.key}
              className={[
                "mmDay",
                c.inMonth ? "" : "muted",
                status ? `mark-${status}` : "",
                ymd(value) === c.key ? "selected" : "",
              ].join(" ")}
              onClick={() => onChange(c.date)}
              type="button"
            >
              {c.date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mmLegend">
        <span><i className="mDot busy" /> Busy</span>
        <span><i className="mDot pending" /> Pending</span>
        <span><i className="mDot reserved" /> Reserved</span>
      </div>
    </div>
  );
}
