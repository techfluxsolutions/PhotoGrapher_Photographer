import React, { useEffect, useState } from "react";
import "./StateCards.css";
import { getDashboardCountsAPI } from "../../../utils/APIs/dashboardApis";

const StatsCards = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  const fetchDashboardCounts = async () => {
    try {
      setLoading(true);

      const res = await getDashboardCountsAPI(1, 5);

      console.log("Dashboard Counts API:", res?.data?.data); // 🔍 check structure

      if (res?.data?.success) {
        const data = res?.data?.data;

        // Map API response into UI format
        const formattedStats = [
          {
            label: "Today's Bookings",
            value: data?.today || 0,
          },
          {
            label: "No. of Requests",
            value: data?.requests || 0,
          },
          {
            label: "Upcomming Bookings",
            value: data?.upcoming || 0,
          },
          {
            label: "Upload Pendings",
            value: `${data?.uploadPending || 0}`,
          },
        ];

        setStats(formattedStats);
      }
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row g-3">
        {loading ? (
          <p>Loading stats...</p>
        ) : (
          stats.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <p className="dashboard-text-color mb-1">
                    {item.label}
                  </p>
                  <p className="fw-bold dashboard-text-color static-state">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StatsCards;

// import "./StateCards.css"
// const StatsCards = () => {
//   const stats = [
//     { label: "Total Visitors", value: 15 },
//     { label: "No. of Registrations", value: 5 },
//     { label: "Total Bookings", value: 23 },
//     { label: "Total Revenue", value: 12 },
//   ];

//   return (
//     <div className="container">
//       <div className="row g-3">
//         {stats.map((item, index) => (
//           <div key={index} className="col-12 col-sm-6 col-lg-3">
//             <div className="card text-center shadow-sm h-100">
//               <div className="card-body">
//                 <p className="dashboard-text-color mb-1">{item.label}</p>
//                 <p className="fw-bold dashboard-text-color static-state">{item.value}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StatsCards;
