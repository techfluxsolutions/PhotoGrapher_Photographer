import React, { useEffect, useState } from "react";
import GalleryAddPhotos from "./GalleryAddPhotos/GalleryAddPhotos";

const GalleryAddPhotosMain = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = sessionStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

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
      className={`content-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ marginTop: "100px" }}
    >
      <div className="page-inner-wrapper mt-4">
        {/* ✅ ONLY TABLE */}
        <GalleryAddPhotos/>
      </div>
    </div>
  );
};

export default GalleryAddPhotosMain;
