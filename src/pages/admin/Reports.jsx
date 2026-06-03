import { useEffect, useState } from "react";
import { getReportSummary } from "../../services/adminApi";
import "../../styles/Reports.css";
export default function Reports() {

  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    try {

      const res =
        await getReportSummary();

      console.log(
        "Reports Response:",
        res.data
      );

      setData(res.data);

    } catch (err) {

      console.error(
        "Reports Error:",
        err.response?.data || err
      );

    }

  };

  if (!data)
    return <h2>Loading...</h2>;

  return (

    <div className="reports-page">

      <h1>
        Reports Dashboard
      </h1>

      <div className="report-grid">

        <div className="report-card">
          <h3>Total Users</h3>
          <h2>{data.totalUsers}</h2>
        </div>

        <div className="report-card">
          <h3>Active Users</h3>
          <h2>{data.activeUsers}</h2>
        </div>

        <div className="report-card">
          <h3>Pending Users</h3>
          <h2>{data.pendingUsers}</h2>
        </div>

        <div className="report-card">
          <h3>Rejected Users</h3>
          <h2>{data.rejectedUsers}</h2>
        </div>

        <div className="report-card">
          <h3>Total Bookings</h3>
          <h2>{data.totalBookings}</h2>
        </div>

        <div className="report-card">
          <h3>Total Credits Sold</h3>
          <h2>{data.totalCreditsSold}</h2>
        </div>

      </div>

    </div>

  );

}