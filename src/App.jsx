import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Home from "./pages/Home";
import Cisco from "./pages/Cisco";
import Fortinet from "./pages/Fortinet";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AccountPending from "./pages/AccountPending";
import PendingApproval from "./pages/PendingApproval";
import RegisterPage from "./pages/RegisterPage";

import SchedulerGate from "./pages/SchedulerGate";
import SchedulerPage from "./pages/SchedulerPage";
import Placeholder from "./pages/Placeholder";

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminBookings from "./pages/admin/Bookings";
import PurchaseHistory from "./pages/PurchaseHistory";
import CreditHistory from "./pages/CreditHistory";
import BuyCredits from "./pages/BuyCredits";
import Reports from "./pages/admin/Reports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
 return (
  <>
    <Routes>

      {/* ================= PUBLIC + AUTH ================= */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cisco" element={<Cisco />} />
        <Route path="/fortinet" element={<Fortinet />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account-pending" element={<AccountPending />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
      </Route>

      {/* ================= ADMIN ================= */}
      {/* <Route path="/admin" element={<AdminLayout />}> */}
      <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  }
>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* ================= DYNAMIC ================= */}
      <Route path="/:slug/calendar" element={<SchedulerPage />} />
      <Route path="/:slug" element={<SchedulerGate />} />
      <Route path="/purchase-history" element={<PurchaseHistory />} />
      <Route path="/credits" element={<CreditHistory />} />
      <Route path="/buy-credits" element={<BuyCredits />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Placeholder />} />

    </Routes>

    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
    />
  </>
);
}
