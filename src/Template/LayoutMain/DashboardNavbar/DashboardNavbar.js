import React, { useState, useEffect, useRef } from "react";
import LogoutModal from "./LogoutModal/LogoutModal";
import "./DashboardNavbar.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { getPhotographerStatus, postPhotographerStatus } from "../../../utils/APIs/navbarApis";
// import { getNotificationUnreadCount } from "../../../utils/APIs/notificationApis";
import { Socket } from "../../../Socket/Socket";


const DashboardNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  // const [notificationCount, setNotificationCount] = useState(0); // State to manage notification count
  const dropdownRef = useRef(null); // To detect clicks outside the dropdown
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
const [loading, setLoading] = useState(false);
const [notificationCount, setNotificationCount] = useState(0);
  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

//    const fetchUnreadCount = async () => {
//     try {
//       const res = await getNotificationUnreadCount();

//       if (res?.data?.success) {
//         setNotificationCount(res?.data?.data?.unreadCount || 0);
//       }
//     } catch (error) {
//       console.error("Failed to fetch unread count");
//     }
//   };
//   useEffect(() => {
//   const handleStorageChange = () => {
//     fetchUnreadCount();
//   };

//   window.addEventListener("storage", handleStorageChange);

//   return () =>
//     window.removeEventListener("storage", handleStorageChange);
// }, []);

// useEffect(() => {
//   const handleFocus = () => {
//     fetchUnreadCount();
//   };

//   window.addEventListener("focus", handleFocus);

//   return () =>
//     window.removeEventListener("focus", handleFocus);
// }, []);

// useEffect(() => {
//   const interval = setInterval(() => {
//     fetchUnreadCount();
//   }, 30000); // every 30 sec

//   return () => clearInterval(interval);
// }, []);

useEffect(() => {
  const socket = Socket(); // ✅ get instance

  // Request count
  socket.emit("get_unread_notification_count");

  // Listen for updates
  socket.on("unread_notification_count", ({ count }) => {
    console.log("New unread count:", count);
    setNotificationCount(count);
  });

  return () => {
    socket.off("unread_notification_count");
  };
}, []);


const handleToggleStatus = async () => {
  const newStatus = isActive ? "inactive" : "active";

  try {
    setLoading(true);

    const res = await postPhotographerStatus({
      status: newStatus,
    });

    if (res?.data?.success) {
      setIsActive(newStatus === "active");
      toast.success(res.data.message || "Status updated successfully");
    } else {
      toast.error(res?.data?.message || "Failed to update status");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchPhotographerStatus = async () => {
    try {
      setLoading(true);

      const res = await getPhotographerStatus();

      if (res?.data?.success) {
        // API response:
        // { success: true, isActive: true, status: "active" }

        setIsActive(res.data.isActive === true);
      } else {
        toast.error(res?.data?.message || "Failed to fetch status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to fetch status"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchPhotographerStatus();
}, []);

  // Open modal when logout is clicked
  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the modal
    setIsDropdownOpen(false); // Close the dropdown
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <nav className="navbar">
      <div className="leftside_navbar_dashboard">
        <div className="DineRightLogo_Dashboard">
        {!isSidebarOpen && (
              <img 
              src="/ProjectLogo/photography_logo.png" 
              alt="Veroa Logo" 
              className="navbar-brand-logo navbar-logo-mobile" 
              style={{ height: "70px", cursor: "pointer" }}
            />
          )}

          {isSidebarOpen && (
              <img 
              src="/ProjectLogo/photography_logo.png" 
              alt="Veroa Logo" 
              className="navbar-brand-logo navbar-logo-mobile" 
              style={{ height: "70px", cursor: "pointer" }}
            />
          )}
        </div>
        <div className="Hamburger_Dashboard">
          {isSidebarOpen ? (
            <img
              className="Hamburger_MobileResponsive"
              src="/Icons/hamburger.png"
              alt="Hamburger Icon"
              onClick={toggleSidebar}
            />
          ) : (
            <img
              className="Hamburger_MobileResponsive"
              src="/Icons/arrow.png"
              alt="Arrow Icon"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>

      <div className="Rightside_navbar_dashboard">

        
        <div className="profile-dropdown" ref={dropdownRef}>
     
           {/* <img
          src="/Icons/Notification-navbar.png"
          alt="Notifications"
          className="navbar-icon"
          style={{
            height: "50px",
            width: "50px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/notification")}
        /> */}

        <div
  className="notification-wrapper"
  // onClick={() => navigate("/notification")}
  onClick={() => {
  navigate("/notification");
  setNotificationCount(0);
}}
>
  <img
    src="/Icons/Notification-navbar.png"
    alt="Notifications"
    className="navbar-icon"
    style={{
      height: "50px",
      width: "50px",
      cursor: "pointer",
    }}
  />

  {notificationCount > 0 && (
    <span className="notification-badge">
      {notificationCount > 99 ? "99+" : notificationCount}
    </span>
  )}
</div>
        <div className="status-toggle-wrapper">
            

          
            <div
  className={`toggle-switch ${isActive ? "on" : ""}`}
  onClick={!loading ? handleToggleStatus : undefined}
  style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.6 : 1 }}
>
  <div className="toggle-knob"></div>
</div>
<span className={`status-text ${isActive ? "active" : "inactive"}`}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
         <img
          src="/Icons/NoProfile-Navbar.png"
          alt="Profile"
          onClick={() => navigate("/profile")}
          className="navbar-icon"
        />

         
          
        <img
            src="/Icons/profile_nav.png"
            alt="Logout"
            onClick={handleLogoutClick}
            className="navbar-icon"
        />

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              
              {/* <li>
                <a onClick={handleLogoutClick}>Logout</a>
              </li>{" "} */}
              <li>
                <button onClick={handleLogoutClick} className="dropdown-btn">
                  Logout
                </button>
              </li>
              {/* Open modal on logout */}
            </ul>
          )}
        </div>
      </div>

      {/* Render the LogoutModal and pass the props to control it */}
      <LogoutModal isOpen={isModalOpen} onClose={closeModal} />
      {loading && <Loader />}
    </nav>
  );
};

export default DashboardNavbar;
