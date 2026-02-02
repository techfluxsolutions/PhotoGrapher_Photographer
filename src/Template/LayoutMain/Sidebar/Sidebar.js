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
              ? "/Icons/camera-active.png"
              : hoveredPath === "/bookings"
                ? "/Icons/camera-active.png"
                : "/Icons/camera-inactive.png"
          }
          alt="Bookings"
          className="sidebar-png-icon"
        />
      ),
    },
    {
      name: "My Quote",
      path: "/my-quote",
      icon: (
        <img
          // src={
          //   location.pathname === "/my-quote"
          //     ? "/Icons/quote-active.png"
          //     : hoveredPath === "/my-quote"
          //       ? "/Icons/quote-active.png"
          //       : "/Icons/quote-inactive.png"
          // }
          src={
            isActive("/my-quote")
              ? "/Icons/quote-active.png"
              : hoveredPath === "/my-quote"
                ? "/Icons/quote-active.png"
                : "/Icons/quote-inactive.png"
          }

          alt="my-quote"
          className="sidebar-png-icon"
        />
      ),
    },

     {
      name: "Services",
      path: "/services",
      icon: (
        <img
          src={
            isActive("/services")
              ? "/Icons/service-active.png"
              : hoveredPath === "/services"
                ? "/Icons/service-active.png"
                : "/Icons/service-inactive.png"
          }
          alt="service"
          className="sidebar-png-icon"
        />
      ),
    },

    {
      name: "Payment",
      path: "/payment",
      icon: (
        <img
          src={
            location.pathname === "/payment"
              ? "/Icons/payment-active.png"
              : hoveredPath === "/payment"
                ? "/Icons/payment-active.png"
                : "/Icons/payment-inactive.png"
          }
          alt="payment"
          className="sidebar-png-icon"
        />
      ),
    },
    {
      name: "Customer",
      path: "/customer",
      icon: (
        <img
          src={
            location.pathname === "/customer"
              ? "/Icons/customer-active.png"
              : hoveredPath === "/customer"
                ? "/Icons/customer-active.png"
                : "/Icons/customer-inactive.png"
          }
          alt="customer"
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
          // <Link to={item.path} key={item.path}>
          //   {/* <li
          //     className={`menu-item ${
          //       location.pathname === item.path ? "active" : ""
          //     }`}
          //   > */}
          //   <li
          //     className={`menu-item ${location.pathname === item.path ? "active" : ""
          //       }`}
          //     onMouseEnter={() => setHoveredPath(item.path)}
          //     onMouseLeave={() => setHoveredPath(null)}
          //   >

          //     {item.icon}
          //     {isOpen && <span>{item.name}</span>}
          //   </li>
          // </Link>

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
