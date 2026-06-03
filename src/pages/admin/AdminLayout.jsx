import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";

import "../../styles/adminLayout.css";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // ✅ Improved active logic
  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">CCIE</div>
            <span className="logo-text">Rack Rentals</span>
          </div>
          <button className="close-sidebar" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <div className="admin-title">
          <h3>Admin Panel</h3>
        </div>

        <nav className="sidebar-nav">
          {/* Dashboard */}
          <Link
            to="/admin"
            className={`nav-item ${isActive("/admin") ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </Link>

          {/* Users */}
          <Link
            to="/admin/users"
            className={`nav-item ${isActive("/admin/users") ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-text">Students</span>
          </Link>

          {/* Bookings */}
          <Link
            to="/admin/bookings"
            className={`nav-item ${isActive("/admin/bookings") ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-text">Bookings</span>
          </Link>


          <Link
       to="/admin/reports"
       className={`nav-item ${isActive("/admin/reports") ? "active" : ""}`}
       onClick={closeSidebar}
       >
      <span className="nav-icon">📈</span>
      <span className="nav-text">Reports</span>
       </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="profile-avatar">A</div>
            <div className="profile-info">
              <div className="profile-name">Admin</div>
              <div className="profile-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>

          <div className="header-title">
            <h2>CCIE Rack Rentals - Admin</h2>
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
