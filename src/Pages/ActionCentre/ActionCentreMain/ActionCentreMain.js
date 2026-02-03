import React from "react";
import { FiHome } from "react-icons/fi";
import "./ActionCentreMain.css";

const notifications = [
  {
    id: 1,
    message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
    time: "1 hr ago",
  },
  {
    id: 2,
    message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
    time: "1 hr ago",
  },
  {
    id: 3,
    message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
    time: "1 hr ago",
  },
  {
    id: 4,
    message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
    time: "1 hr ago",
  },
  {
    id: 5,
    message: "New wedding booking assigned to you for 24 March 2026 in Mumbai.",
    time: "1 hr ago",
  },
];

const ActionCentreMain = () => {
  return (
    <div className="action-centre-wrapper">
      <div className="action-centre-card">
        {notifications.map((item) => (
          <div key={item.id} className="notification-item">
            <div className="notification-left">
              <div className="icon-box">
                <img
                  src="/Icons/Notification-action-centre.png"
                  alt="notification"
                  className="notification-icon-action-centre"
                />              
                </div>
              <p className="notification-text">{item.message}</p>
            </div>

            <span className="notification-time">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionCentreMain;
