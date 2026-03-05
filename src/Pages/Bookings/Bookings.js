// import React, { useEffect, useState } from "react";
// import "../../Template/LayoutMain/LayoutMain/Layout.css";
// import "./Bookings.css";
// import BookingHistoryTable from "./BookingHistoryTable/BookingHistoryTable";
// import BookingsTable from "./BookingsTable/BookingsTable";

// const Bookings = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
//     const stored = sessionStorage.getItem("isSidebarOpen");
//     return stored !== null ? JSON.parse(stored) : true;
//   });

//   const [activeTab, setActiveTab] = useState(() => {
//     const savedTab = sessionStorage.getItem("bookingsActiveTab");
//     return savedTab ? savedTab : "myBookings";
//   });

//   useEffect(() => {
//     sessionStorage.setItem("bookingsActiveTab", activeTab);
//   }, [activeTab]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const stored = sessionStorage.getItem("isSidebarOpen");
//       const parsed = stored !== null ? JSON.parse(stored) : true;

//       if (parsed !== isSidebarOpen) {
//         setIsSidebarOpen(parsed);
//       }
//     }, 10);

//     return () => clearInterval(interval);
//   }, [isSidebarOpen]);

//   return (
//     <div
//       className={`content-container ${
//         isSidebarOpen ? "sidebar-open" : "sidebar-closed"
//       }`}
//       style={{ marginTop: "100px" }}
//     >
//       <div className="page-inner-wrapper">
//         <h2 className="page-title">My Bookings</h2>

//         {/* Tabs */}
//         <div className="custom-tabs">
//           <div
//             className={`tab-item ${
//               activeTab === "myBookings" ? "active" : ""
//             }`}
//             onClick={() => setActiveTab("myBookings")}
//           >
//             Upcomming Bookings
//           </div>

         
//           <div
//             className={`tab-item ${
//               activeTab === "bookingHistory" ? "active" : ""
//             }`}
//             onClick={() => setActiveTab("bookingHistory")}
//           >
//             Booking History
//           </div>
//         </div>

//         {/* Tab Content */}
//         {activeTab === "myBookings" && <BookingsTable />}
//         {activeTab === "bookingHistory" && <BookingHistoryTable />}
//       </div>
//     </div>
//   );
// };

// export default Bookings;



import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import "./Bookings.css";
import BookingHistoryTable from "./BookingHistoryTable/BookingHistoryTable";
import BookingsTable from "./BookingsTable/BookingsTable";
import UpcomingBookingDetails from "./BookingsTable/UpcomingBookingDetails/UpcomingBookingDetails";

const Bookings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = sessionStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = sessionStorage.getItem("bookingsActiveTab");
    return savedTab ? savedTab : "myBookings";
  });

  const [selectedBooking, setSelectedBooking] = useState(null);

  /* ================= SAVE ACTIVE TAB ================= */

  useEffect(() => {
    sessionStorage.setItem("bookingsActiveTab", activeTab);
  }, [activeTab]);

  /* ================= SIDEBAR WATCHER ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = sessionStorage.getItem("isSidebarOpen");
      const parsed = stored !== null ? JSON.parse(stored) : true;

      if (parsed !== isSidebarOpen) {
        setIsSidebarOpen(parsed);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isSidebarOpen]);

  /* ================= RESTORE BOOKING AFTER REFRESH ================= */

  useEffect(() => {
    const savedBookingId = sessionStorage.getItem("selectedBookingId");

    if (savedBookingId && activeTab === "bookingDetails") {
      setSelectedBooking({ shootId: savedBookingId });
    }
  }, []);

  /* ================= HANDLE DETAILS ================= */

  const handleOpenDetails = (booking) => {
    sessionStorage.setItem("selectedBookingId", booking.shootId);

    setSelectedBooking({ shootId: booking.shootId });
    setActiveTab("bookingDetails");
  };

  const handleBackToBookings = () => {
    sessionStorage.removeItem("selectedBookingId");
    setActiveTab("myBookings");
    setSelectedBooking(null);
  };

  return (
    <div
      className={`content-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ marginTop: "100px" }}
    >
      <div className="page-inner-wrapper">

        {/* SHOW TITLE & TABS ONLY IF NOT IN DETAILS */}
        {activeTab !== "bookingDetails" && (
          <>
            <h2 className="page-title">My Bookings</h2>

            <div className="custom-tabs">
              <div
                className={`tab-item ${
                  activeTab === "myBookings" ? "active" : ""
                }`}
                onClick={() => setActiveTab("myBookings")}
              >
                Upcoming Bookings
              </div>

              <div
                className={`tab-item ${
                  activeTab === "bookingHistory" ? "active" : ""
                }`}
                onClick={() => setActiveTab("bookingHistory")}
              >
                Booking History
              </div>
            </div>
          </>
        )}

        {/* TAB CONTENT */}

        {activeTab === "myBookings" && (
          <BookingsTable onViewDetails={handleOpenDetails} />
        )}

        {activeTab === "bookingHistory" && <BookingHistoryTable />}

        {activeTab === "bookingDetails" && selectedBooking && (
          <UpcomingBookingDetails
            booking={selectedBooking}
            onBack={handleBackToBookings}
          />
        )}
      </div>
    </div>
  );
};

export default Bookings;