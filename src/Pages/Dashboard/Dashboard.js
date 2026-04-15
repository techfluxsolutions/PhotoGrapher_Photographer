// import { useEffect, useState } from "react";
// import StatsCards from "./StateCards/StateCards";
// import UpcomingBookings from "./UpcomingBooking/UpcomingBooking";
// import LatestQuotes from "./LatestQuotes/LatestQuotes";
// import "./Dashboard.css";

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
//       <div className="container-fluid px-3 px-md-4">
       
// <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
//   <div>
//     <h2 className="fw-bold mb-1 dashboard-title">Welcome Back,</h2>
//     <p className="dashboard-subtitle">
//       Here’s what’s happening with your shoots
//     </p>
//   </div>

//   {/* Right: Photographer Info */}
//   <div className="photographer-info d-flex align-items-center gap-3">
//     {/* Profile Image */}
//     <img
//       src="https://via.placeholder.com/50"
//       alt="Photographer"
//       className="photographer-img"
//     />

//     {/* Name & Badge */}
//     <div className="photographer-text">
//       <div className="photographer-name">
//         Rahul Sharma <span className="badge-level">(Professional)</span>
//       </div>

//       <div className="photographer-stats">
//         <span>Customer Feedback: <strong>128</strong></span>
//         <span className="mx-2">|</span>
//         <span>Veroa Rating: <strong>4 / 5</strong></span>
//       </div>
//     </div>
//   </div>
// </div>

//   {/* Main Grid */}
//         <div className="row g-4 mb-4">
//           {/* Upcoming Bookings */}
//           <div className="col-12 col-lg-6">
//             <UpcomingBookings />
//           </div>

//           {/* Latest Quotes */}
//           <div className="col-12 col-lg-6">
//             <LatestQuotes />
//           </div>
//         </div>


//         {/* Stats */}
//         <div className="mb-4">
//           <StatsCards />
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

import { getProfilePhotographer } from "../../utils/APIs/profileApis";
import Loader from "../../Template/Loader/Loader";
import { getDashboardRatingsAPI } from "../../utils/APIs/dashboardApis";
import BookingRequest from "./BookingRequest/BookingRequest";
import PendingGalleryUpload from "./PendingGalleryUpload/PendingGalleryUpload";

const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

  const [photographer, setPhotographer] = useState(null);
   const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("isSidebarOpen");
      const parsed = stored !== null ? JSON.parse(stored) : true;
      if (parsed !== isSidebarOpen) setIsSidebarOpen(parsed);
    }, 10);

    return () => clearInterval(interval);
  }, [isSidebarOpen]);

    const fetchRatingInfo = async () => {
    try {
      setLoading(true);

      const res = await getDashboardRatingsAPI();
      console.log("RESPONSE",res?.data)
     setRating(res?.data)

      // correct response handling
     

    } catch (error) {
      console.error("Failed to fetch photographer profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchRatingInfo()
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getProfilePhotographer();
     

      // correct response handling
      setPhotographer(res?.data?.photographer);

    } catch (error) {
      console.error("Failed to fetch photographer profile", error);
    } finally {
      setLoading(false);
    }
  };

  const fullName =
    photographer?.basicInfo?.fullName?.trim() || "Your name";

  const profilePhoto =
    photographer?.basicInfo?.profilePhoto || "";

  const expertiseLevel =
    photographer?.professionalDetails?.expertiseLevel?.trim() || "Your expertise";

  if (loading) return <Loader />;

  return (
    <div
      className={`content-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ marginTop: "100px" }}
    >
      <div className="container-fluid px-3 px-md-4">

        {/* Header */}
        <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">

          {/* Left */}
          <div>
            <h2 className="fw-bold mb-1 dashboard-title">Welcome Back,</h2>
            <p className="dashboard-subtitle">
              Here’s what’s happening with your shoots
            </p>
          </div>

          {/* Photographer Info */}
          <div className="photographer-info d-flex align-items-center gap-3">

            {/* Profile Image */}
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Photographer"
                className="photographer-img"
              />
            ) : (
              <div className="photographer-placeholder">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Name & Stats */}
            <div className="photographer-text">

              <div className="photographer-name">
                {fullName}
                <span className="badge-level"> ({expertiseLevel})</span>
              </div>

             <div className="photographer-stats">
  <span className="d-flex align-items-center gap-1">
    <strong>Customer Rating :</strong>
    <StarRating rating={rating?.totalUserRatings || 0} />
    <strong>({rating?.totalUserRatings || 0}/5)</strong>
  </span>

  <span className="d-flex align-items-center gap-1">
     <strong>Veroa Rating :</strong>
    <StarRating rating={rating?.adminRating?.ratingCount || 0} />
    <strong>({rating?.adminRating?.ratingCount || 0}/5)</strong>
  </span>
</div>

            </div>
          </div>

        </div>

        {/* Main Grid */}
        <div className="row g-4 mb-4">

          <div className="col-12 col-lg-6">
            <UpcomingBookings />
          </div>

          <div className="col-12 col-lg-6">
            <LatestQuotes />
          </div>

        </div>

        <div className="row g-4 mb-4">

          <div className="col-12 col-lg-6">
            <BookingRequest />
          </div>

          <div className="col-12 col-lg-6">
            <PendingGalleryUpload />
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