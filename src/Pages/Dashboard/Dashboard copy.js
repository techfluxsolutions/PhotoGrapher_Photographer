// import { useEffect, useState } from "react";
// import StatsCards from "./StateCards/StateCards";
// import UpcomingBookings from "./UpcomingBooking/UpcomingBooking";
// import LatestQuotes from "./LatestQuotes/LatestQuotes";
// import "./Dashboard.css"
// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
//     const stored = localStorage.getItem("isSidebarOpen");
//     return stored !== null ? JSON.parse(stored) : true;
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const stored = localStorage.getItem("isSidebarOpen");
//       const parsed = stored !== null ? JSON.parse(stored) : true;
//       if (parsed !== isSidebarOpen) setIsSidebarOpen(parsed);
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
//         <h2 className="mb-4">Welcome Back,</h2>
//         <p>Here’s what’s happening with your shoots</p>

//         <StatsCards />

//         <div className="dashboard-grid">
//           <UpcomingBookings />
//           <LatestQuotes />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from "react";
import StatsCards from "./StateCards/StateCards";
import UpcomingBookings from "./UpcomingBooking/UpcomingBooking";
import LatestQuotes from "./LatestQuotes/LatestQuotes";
import "./Dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("isSidebarOpen");
      const parsed = stored !== null ? JSON.parse(stored) : true;
      if (parsed !== isSidebarOpen) setIsSidebarOpen(parsed);
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
      <div className="container-fluid px-3 px-md-4">
        {/* Header */}
        {/* <div className="mb-4">
          <h2 className="fw-bold mb-1 dashboard-title">Welcome Back,</h2>
          <p className="dashboard-subtitle">
            Here’s what’s happening with your shoots
          </p>
        </div> */}
        {/* Header */}
<div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
  {/* Left: Welcome Text */}
  <div>
    <h2 className="fw-bold mb-1 dashboard-title">Welcome Back,</h2>
    <p className="dashboard-subtitle">
      Here’s what’s happening with your shoots
    </p>
  </div>

  {/* Right: Photographer Info */}
  <div className="photographer-info d-flex align-items-center gap-3">
    {/* Profile Image */}
    <img
      src="https://via.placeholder.com/50"
      alt="Photographer"
      className="photographer-img"
    />

    {/* Name & Badge */}
    <div className="photographer-text">
      <div className="photographer-name">
        Rahul Sharma <span className="badge-level">(Professional)</span>
      </div>

      <div className="photographer-stats">
        <span>Customer Feedback: <strong>128</strong></span>
        <span className="mx-2">|</span>
        <span>Veroa Rating: <strong>4 / 5</strong></span>
      </div>
    </div>
  </div>
</div>

  {/* Main Grid */}
        <div className="row g-4 mb-4">
          {/* Upcoming Bookings */}
          <div className="col-12 col-lg-6">
            <UpcomingBookings />
          </div>

          {/* Latest Quotes */}
          <div className="col-12 col-lg-6">
            <LatestQuotes />
          </div>
        </div>


        {/* Stats */}
        <div className="mb-4">
          <StatsCards />
        </div>

      
      </div>
    </div>
  );
};

export default Dashboard;
