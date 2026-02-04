import React from "react";
import "./ProfilePage.css";

const CURRENT_LEVEL = "intermediate"; // beginner | intermediate | professional

const ProfilePage = () => {
  const isBeginner = CURRENT_LEVEL === "beginner";
  const isIntermediate = CURRENT_LEVEL === "intermediate";
  const isProfessional = CURRENT_LEVEL === "professional";

  return (
    <div className="profile-page-wrapper">

      {/* ===== Level Tracker ===== */}
      <div className="level-tracker">
        <div className={`tracker-step ${isBeginner || isIntermediate || isProfessional ? "active" : ""}`}>
          <span className="dot" />
          <p>Beginner</p>
        </div>

        <div className={`tracker-line ${isIntermediate || isProfessional ? "active-line" : ""}`} />

        <div className={`tracker-step ${isIntermediate || isProfessional ? "active" : ""}`}>
          <span className="dot" />
          <p>Intermediate</p>
        </div>

        <div className={`tracker-line ${isProfessional ? "active-line" : ""}`} />

        <div className={`tracker-step ${isProfessional ? "active" : ""}`}>
          <span className="dot" />
          <p>Professional</p>
        </div>
      </div>

      {/* ===== Profile Header ===== */}
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div>
          <h2>Arjun Mehta</h2>
          <p>Wedding & Fashion Photographer</p>
        </div>
      </div>

      {/* ===== Basic Information ===== */}
      <div className="profile-card">
        <h3 className="section-title">Basic Information</h3>

        <div className="card-body">
          <div className="input-box">Full Name</div>
          <div className="input-box">Display Name</div>
          <div className="input-box">Email</div>
          <div className="input-box">Phone No.</div>
        </div>

        
      </div>

      {/* ===== Professional Details ===== */}
      <div className="profile-card">
        <h3 className="section-title">Professional Details</h3>

        <div className="card-body">
          <div className="input-box dropdown">Photographer Type</div>
          <div className="input-box dropdown">Years of Experience</div>
          <div className="input-box">Primary Location</div>
          <div className="input-box dropdown">Willing to Travel</div>
          <div className="input-box dropdown">Languages Spoken</div>
        </div>

        {/* ✅ SINGLE SAVE BUTTON NEAR FORM */}
        <div className="form-action  mt-4" style={{textAlign:"center", width:"500px"}} >
          <button className="save-btn">Save</button>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
