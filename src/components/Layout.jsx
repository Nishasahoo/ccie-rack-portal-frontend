import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* push content below fixed navbar */}
      <main style={{ paddingTop: 90, minHeight: "calc(100vh - 90px)" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
