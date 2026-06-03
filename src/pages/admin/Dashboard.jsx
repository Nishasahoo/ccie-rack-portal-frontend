import { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    totalBookings: 0
  });

  useEffect(() => {
    // Fetch your actual stats here
    // Example:
    // const fetchStats = async () => {
    //   const res = await getDashboardStats();
    //   setStats(res.data);
    // };
    // fetchStats();

    // Demo data
    setStats({
      totalUsers: 8,
      pendingApprovals: 3,
      totalBookings: 15
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-welcome">Welcome Admin</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-users">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card stat-approvals">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Pending Approvals</h3>
            <p className="stat-value">{stats.pendingApprovals}</p>
          </div>
        </div>

        <div className="stat-card stat-bookings">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Total Bookings</h3>
            <p className="stat-value">{stats.totalBookings}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h2 className="info-title">Quick Actions</h2>
          <ul className="action-list">
            <li className="action-item">
              <span className="action-icon">👥</span>
              <span>Manage Users</span>
            </li>
            <li className="action-item">
              <span className="action-icon">✅</span>
              <span>Approve Pending Users</span>
            </li>
            <li className="action-item">
              <span className="action-icon">📅</span>
              <span>View All Bookings</span>
            </li>
          </ul>
        </div>

        <div className="info-card">
          <h2 className="info-title">Recent Activity</h2>
          <ul className="activity-list">
            <li className="activity-item">
              <span className="activity-dot"></span>
              <span>New user registration</span>
            </li>
            <li className="activity-item">
              <span className="activity-dot"></span>
              <span>Booking confirmed</span>
            </li>
            <li className="activity-item">
              <span className="activity-dot"></span>
              <span>User approved</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}