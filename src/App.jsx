import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Cisco from "./pages/Cisco";
import Fortinet from "./pages/Fortinet";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Placeholder from "./pages/Placeholder";

import SchedulerGate from "./pages/SchedulerGate";
import SchedulerPage from "./pages/SchedulerPage";

import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AccountPending from "./pages/AccountPending";
import PendingApproval from "./pages/PendingApproval";
import RegisterPage from "./pages/RegisterPage";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/cisco" element={<Cisco />} />
        <Route path="/fortinet" element={<Fortinet />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
       
        {/* auth pages */}
     <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* scheduler flow (single source of truth) */}
     <Route path="/:slug" element={<SchedulerGate />} />

        <Route path="/:slug/calendar" element={<SchedulerPage />} />

        {/* fallback */}
        <Route path="/placeholder" element={<Placeholder />} />
        <Route path="*" element={<Placeholder />} />
        <Route path="/account-pending" element={<AccountPending />} />
       <Route path="/pending-approval" element={<PendingApproval />} />
<Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
