// import React, { useEffect, useState } from "react";
// import "../../Template/LayoutMain/LayoutMain/Layout.css";
// // import "./Bookings.css";
// import "../Bookings/Bookings.css";

// import BookingRequestTable from "./BookingRequestTable/BookingRequestTable";


// const BookingRequest = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
//     const stored = localStorage.getItem("isSidebarOpen");
//     return stored !== null ? JSON.parse(stored) : true;
//   });

//   const [activeTab, setActiveTab] = useState("upcomming");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const stored = localStorage.getItem("isSidebarOpen");
//       const parsed = stored !== null ? JSON.parse(stored) : true;

//       if (parsed !== isSidebarOpen) {
//         setIsSidebarOpen(parsed);
//       }
//     }, 10);

//     return () => clearInterval(interval);
//   }, [isSidebarOpen]);

//   return (
// <div
//   className={`content-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
//   style={{ marginTop: "100px" }}
// >
//   <div className="page-inner-wrapper">

//     <h2 className="mb-5 mt-2">Booking Request</h2>

//     <BookingRequestTable/>

//   </div>
// </div>

//   );
// };

// export default BookingRequest;


import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import "../Bookings/Bookings.css";

import BookingRequestTable from "./BookingRequestTable/BookingRequestTable";

const BookingRequest = () => {
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
      className={`content-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      style={{ marginTop: "100px" }}
    >
      <div className="page-inner-wrapper">
        <h2 className="mb-5 mt-2">Booking Request</h2>

        <BookingRequestTable />
      </div>
    </div>
  );
};

export default BookingRequest;