import React, { useState, useEffect, useRef } from "react";
import LogoutModal from "./LogoutModal/LogoutModal";
import "./DashboardNavbar.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { getPhotographerStatus, postPhotographerStatus } from "../../../utils/APIs/navbarApis";


const DashboardNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [notificationCount, setNotificationCount] = useState(0); // State to manage notification count
  const dropdownRef = useRef(null); // To detect clicks outside the dropdown
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
const [loading, setLoading] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
              alt="Hire Roofer Logo" 
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
     
           <img
          src="/Icons/Notification-navbar.png"
          alt="Notifications"
          className="navbar-icon"
          style={{
            height: "50px",
            width: "50px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/actionCentre")}
        />
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
              
              <li>
                <a onClick={handleLogoutClick}>Logout</a>
              </li>{" "}
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
