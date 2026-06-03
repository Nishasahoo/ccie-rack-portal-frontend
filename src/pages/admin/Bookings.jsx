import { useEffect, useState } from "react";
import { getBookings } from "../../services/adminApi";
import "../../styles/bookings.css";

export default function Bookings() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await getBookings();
      setRows(res.data);
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h1 className="bookings-title">Bookings</h1>
        <div className="bookings-count">
          <span className="count-label">Total Bookings:</span>
          <span className="count-value">{rows.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Course</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    No bookings found
                  </td>
                </tr>
              ) : (
                rows.map(b => (
                  <tr key={b.id}>
                    <td data-label="User">
                      <div className="user-cell">
                        <span className="user-avatar">
                          {b.userEmail.charAt(0).toUpperCase()}
                        </span>
                        <span className="user-email">{b.userEmail}</span>
                      </div>
                    </td>
                    <td data-label="Course">
                      <span className="course-badge">{b.course}</span>
                    </td>
                    <td data-label="Start">
                      <div className="datetime-cell">
                        <span className="datetime-icon">📅</span>
                        <span>{formatDateTime(b.startTime)}</span>
                      </div>
                    </td>
                    <td data-label="End">
                      <div className="datetime-cell">
                        <span className="datetime-icon">🏁</span>
                        <span>{formatDateTime(b.endTime)}</span>
                      </div>
                    </td>
                    <td data-label="Status">
                      <span className={`status-badge status-${b.status.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}