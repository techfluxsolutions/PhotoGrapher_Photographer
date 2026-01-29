import React, { useState, useEffect } from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const getInitialSidebarState = () => {
    const savedState = sessionStorage.getItem("isSidebarOpen");
    return savedState ? JSON.parse(savedState) : true;
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);
  const handleMenuClick = () => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 🔹 Handle mobile & tablet default = false
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        // desktop → restore saved state or open
        setIsSidebarOpen(getInitialSidebarState());
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Persist only on desktop
  useEffect(() => {
    if (window.innerWidth > 1024) {
      sessionStorage.setItem("isSidebarOpen", isSidebarOpen);
    }
  }, [isSidebarOpen]);

  return (
    <div className="layout">
      <Sidebar
        isOpen={isSidebarOpen}
        onItemClick={handleMenuClick}
      />


      <DashboardNavbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div
        className={`content-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
      >
        <main className="main-content">
          <Outlet context={{ isSidebarOpen }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
