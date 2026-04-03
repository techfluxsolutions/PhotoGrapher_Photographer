
import React, { useEffect, useState } from "react";
import ViewImages from "./ViewImages/ViewImages";

const ViewGalleryImages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("isSidebarOpen");
      const parsed = stored !== null ? JSON.parse(stored) : true;

      if (parsed !== isSidebarOpen) {
        setIsSidebarOpen(parsed);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isSidebarOpen]);

  return (
    <div
      className={`content-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ marginTop: "100px" }}
    >
      <div className="page-inner-wrapper">
        {/* ✅ ONLY TABLE */}
        <ViewImages />
      </div>
    </div>
  );
};

export default ViewGalleryImages;
