import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// All icons from react-icons/hi
import {
  HiOutlineViewGrid,
  HiOutlineLogout,
} from "react-icons/hi";

import "./Sidebar.css";
const Sidebar = ({ isOpen, onItemClick }) => {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const isActive = (path) => {
    if (path === "/my-quote") {
      return (
        location.pathname === "/my-quote" ||
        location.pathname.startsWith("/chat/quote")
      );
    }

      // Bookings + Booking Chat  ✅ ADD THIS
  // if (path === "/bookings") {
  //   return (
  //     location.pathname === "/bookings" ||
  //     location.pathname.startsWith("/chat/booking")
  //   );
  // }

  if (path === "/bookings") {
  return (
    location.pathname === "/bookings" ||
    location.pathname.startsWith("/bookings/") || // ✅ gallery-upload included
    location.pathname.startsWith("/chat/booking")
  );
}

  if (path === "/services") {
    return (
      location.pathname === "/services" ||
      location.pathname.startsWith("/services-pricing")
    );
  }
    return location.pathname === path;
  };



  const menuItems = [
    {
      name: "Dashboard",
      icon: <HiOutlineViewGrid size={20} />,
      path: "/dashboard",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: (
        <img
          src={
            isActive("/bookings")
              ? "/Icons/Booking-active.png"
              : hoveredPath === "/bookings"
                ? "/Icons/Booking-active.png"
                : "/Icons/Booking-inactive.png"
          }
          alt="Bookings"
          className="sidebar-png-icon"
        />
      ),
    },

     {
      name: "Action Centre",
      path: "/actionCentre",
      icon: (
        <img
          src={
            location.pathname === "/actionCentre"
              ? "/Icons/Notification-active.png"
              : hoveredPath === "/payment"
                ? "/Icons/Notification-active.png"
                : "/Icons/Notification-inactive.png"
          }
          alt="actionCentre"
          className="sidebar-png-icon"
        />
      ),
    },
    {
      name: "Payout",
      path: "/payment",
      icon: (
        <img
          src={
            location.pathname === "/payment"
              ? "/Icons/Payout-active.png"
              : hoveredPath === "/payment"
                ? "/Icons/Payout-active.png"
                : "/Icons/Payout-inactive.png"
          }
          alt="payment"
          className="sidebar-png-icon"
        />
      ),
    },
    {
      name: "Logout",
      icon: <HiOutlineLogout size={20} />,
      path: "/logout",
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <ul className="sidebar-menu" style={{ marginTop: "10vh" }}>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path} onClick={onItemClick}>
            <li
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}

              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          </Link>

        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
