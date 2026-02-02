

import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import "./Bookings.css";
import BookingsTable from "./BookingsTable/BookingsTable";


const Bookings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = sessionStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [activeTab, setActiveTab] = useState("upcomming");

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = sessionStorage.getItem("isSidebarOpen");
      const parsed = stored !== null ? JSON.parse(stored) : true;

      if (parsed !== isSidebarOpen) {
        setIsSidebarOpen(parsed);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isSidebarOpen]);

  return (
<div
  className={`content-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
  style={{ marginTop: "100px" }}
>
  <div className="page-inner-wrapper">

    <h2 className="mb-4">Bookings</h2>

    <BookingsTable/>

  </div>
</div>

  );
};

export default Bookings;
