// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// // All icons from react-icons/hi
// import {
//   HiOutlineViewGrid,
//   HiOutlineLogout,
// } from "react-icons/hi";

// import "./Sidebar.css";
// const Sidebar = ({ isOpen, onItemClick }) => {
//   const location = useLocation();
//   const [hoveredPath, setHoveredPath] = useState(null);

//   const isActive = (path) => {
//     if (path === "/my-quote") {
//       return (
//         location.pathname === "/my-quote" ||
//         location.pathname.startsWith("/chat/quote")
//       );
//     }

//       // Bookings + Booking Chat  ✅ ADD THIS
//   // if (path === "/bookings") {
//   //   return (
//   //     location.pathname === "/bookings" ||
//   //     location.pathname.startsWith("/chat/booking")
//   //   );
//   // }

//   if (path === "/bookings") {
//   return (
//     location.pathname === "/bookings" ||
//     location.pathname.startsWith("/bookings/") || // ✅ gallery-upload included
//     location.pathname.startsWith("/chat/booking")
//   );
// }

//   if (path === "/services") {
//     return (
//       location.pathname === "/services" ||
//       location.pathname.startsWith("/services-pricing")
//     );
//   }
//     return location.pathname === path;
//   };



//   const menuItems = [
//     {
//       name: "Dashboard",
//       icon: <HiOutlineViewGrid size={20} />,
//       path: "/dashboard",
//     },
//  {
//       name: "Booking Request",
//       path: "/bookingRequest",
//       icon: (
//         <img
//           src={
//             isActive("/bookingRequest")
//               ? "/Icons/Booking-active.png"
//               : hoveredPath === "/bookingRequest"
//                 ? "/Icons/Booking-active.png"
//                 : "/Icons/Booking-inactive.png"
//           }
//           alt="Booking Request"
//           className="sidebar-png-icon"
//         />
//       ),
//     },

//     {
//       name: "My Bookings",
//       path: "/bookings",
//       icon: (
//         <img
//           src={
//             isActive("/bookings")
//               ? "/Icons/Booking-active.png"
//               : hoveredPath === "/bookings"
//                 ? "/Icons/Booking-active.png"
//                 : "/Icons/Booking-inactive.png"
//           }
//           alt="Bookings"
//           className="sidebar-png-icon"
//         />
//       ),
//     },

    
// {
//       name: "Calender View",
//       icon: <HiOutlineViewGrid size={20} />,
//       path: "/calender",
//     },
//      {
//       name: "Notification",
//       path: "/notification",
//       icon: (
//         <img
//           src={
//             location.pathname === "/notification"
//               ? "/Icons/Notification-active.png"
//               : hoveredPath === "/payment"
//                 ? "/Icons/Notification-active.png"
//                 : "/Icons/Notification-inactive.png"
//           }
//           alt="actionCentre"
//           className="sidebar-png-icon"
//         />
//       ),
//     },
//     {
//       name: "Payout",
//       path: "/payment",
//       icon: (
//         <img
//           src={
//             location.pathname === "/payment"
//               ? "/Icons/Payout-active.png"
//               : hoveredPath === "/payment"
//                 ? "/Icons/Payout-active.png"
//                 : "/Icons/Payout-inactive.png"
//           }
//           alt="payment"
//           className="sidebar-png-icon"
//         />
//       ),
//     },
//     {
//       name: "Logout",
//       icon: <HiOutlineLogout size={20} />,
//       path: "/logout",
//     },
//   ];

//   return (
//     <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
//       <ul className="sidebar-menu" style={{ marginTop: "10vh" }}>
//         {menuItems.map((item) => (
//           <Link to={item.path} key={item.path} onClick={onItemClick}>
//             <li
//               className={`menu-item ${isActive(item.path) ? "active" : ""}`}

//               onMouseEnter={() => setHoveredPath(item.path)}
//               onMouseLeave={() => setHoveredPath(null)}
//             >
//               {item.icon}
//               {isOpen && <span>{item.name}</span>}
//             </li>
//           </Link>

//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  HiOutlineViewGrid,
  HiOutlineLogout,
  HiOutlineCalendar,
  HiOutlineBell,
  HiOutlineCreditCard,
  HiOutlineClipboardList,
  HiOutlineInbox
} from "react-icons/hi";

import "./Sidebar.css";
import { useState } from "react";
import LogoutModal from "../DashboardNavbar/LogoutModal/LogoutModal";

const Sidebar = ({ isOpen, onItemClick }) => {
  const location = useLocation();
  // const [hoveredPath, setHoveredPath] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  // Open modal when logout is clicked
  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the modal
  };

    // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isActive = (path) => {
    if (path === "/my-quote") {
      return (
        location.pathname === "/my-quote" ||
        location.pathname.startsWith("/chat/quote")
      );
    }

    if (path === "/bookings") {
      return (
        location.pathname === "/bookings" ||
        location.pathname.startsWith("/bookings/") ||
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
      name: "Booking Request",
      path: "/bookingRequest",
      icon: <HiOutlineInbox size={20} />,
    },
    {
      name: "My Bookings",
      path: "/bookings",
      icon: <HiOutlineClipboardList size={20} />,
    },
    {
      name: "Calender View",
      icon: <HiOutlineCalendar size={20} />,
      path: "/calender",
    },
    {
      name: "Notification",
      path: "/notification",
      icon: <HiOutlineBell size={20} />,
    },
    {
      name: "Payout",
      path: "/payment",
      icon: <HiOutlineCreditCard size={20} />,
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
        {/* {menuItems.map((item) => (
          <Link to={item.path} key={item.path} onClick={onItemClick}>
            <li
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              // onMouseEnter={() => setHoveredPath(item.path)}
              // onMouseLeave={() => setHoveredPath(null)}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          </Link>
        ))} */}

        {menuItems.map((item) => {
  // If Logout → open modal instead of navigation
  if (item.name === "Logout") {
    return (
      <li
        key={item.path}
        className="menu-item"
        onClick={handleLogoutClick}
        style={{ cursor: "pointer" }}
      >
        {item.icon}
        <span>{item.name}</span>
        {/* {isOpen && <span>{item.name}</span>} */}
      </li>
    );
  }

  // Normal navigation items
  return (
    <Link to={item.path} key={item.path} onClick={onItemClick}>
      <li
        className={`menu-item ${
          isActive(item.path) ? "active" : ""
        }`}
      >
        {item.icon}
         <span>{item.name}</span>
        {/* {isOpen && <span>{item.name}</span>} */}
      </li>
    </Link>
  );
})}
      </ul>

      <LogoutModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Sidebar;
