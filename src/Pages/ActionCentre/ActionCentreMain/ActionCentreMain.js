// import React from "react";
// import { FiHome } from "react-icons/fi";
// import "./ActionCentreMain.css";

// const notifications = [
//   {
//     id: 1,
//     message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
//     time: "1 hr ago",
//   },
//   {
//     id: 2,
//     message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
//     time: "1 hr ago",
//   },
//   {
//     id: 3,
//     message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
//     time: "1 hr ago",
//   },
//   {
//     id: 4,
//     message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
//     time: "1 hr ago",
//   },
//   {
//     id: 5,
//     message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
//     time: "1 hr ago",
//   },
// ];

// const ActionCentreMain = () => {
//   return (
//     <div className="action-centre-wrapper">
//       <div className="action-centre-card">
//         {notifications.map((item) => (
//           <div key={item.id} className="notification-item">
//             <div className="notification-left">
//               <div className="icon-box">
//                 <img
//                   src="/Icons/Notification-action-centre.png"
//                   alt="notification"
//                   className="notification-icon-action-centre"
//                 />              
//                 </div>
//               <p className="notification-text">{item.message}</p>
//             </div>

//             <span className="notification-time">{item.time}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActionCentreMain;


import React, { useEffect, useState } from "react";
import "./ActionCentreMain.css";
import { toast } from "react-toastify";
import { getNotification } from "../../../utils/APIs/notificationApis";
import Loader from "../../../Template/Loader/Loader";


const ActionCentreMain = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        const res = await getNotification();

        if (res?.data?.success) {
          setNotifications(res?.data?.data?.notifications || []);
        } else {
          toast.error(res?.data?.message || "Failed to fetch notifications");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="action-centre-wrapper">
      <div className="action-centre-card">

        {!loading && notifications.length === 0 && (
          <p className="no-notification-text">
            No notifications available
          </p>
        )}

        {notifications.map((item) => (
          <div
            key={item._id}
            className={`notification-item ${
              !item.read_status ? "unread" : ""
            }`}
          >
            <div className="notification-left">
              <div className="icon-box">
                <img
                  src="/Icons/Notification-action-centre.png"
                  alt="notification"
                  className="notification-icon-action-centre"
                />
              </div>

              <p className="notification-text">
                {item.message}
              </p>
            </div>

            <span className="notification-time">
              {item.time}
            </span>
          </div>
        ))}
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default ActionCentreMain;