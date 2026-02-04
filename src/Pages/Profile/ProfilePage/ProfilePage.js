// import React from "react";
// import "./ProfilePage.css";

// const CURRENT_LEVEL = "intermediate"; // beginner | intermediate | professional

// const ProfilePage = () => {
//   const isBeginner = CURRENT_LEVEL === "beginner";
//   const isIntermediate = CURRENT_LEVEL === "intermediate";
//   const isProfessional = CURRENT_LEVEL === "professional";

//   return (
//     <div className="profile-page-wrapper">

//       {/* ===== Level Tracker ===== */}
//       <div className="level-tracker">
//         <div className={`tracker-step ${isBeginner || isIntermediate || isProfessional ? "active" : ""}`}>
//           <span className="dot" />
//           <p>Beginner</p>
//         </div>

//         <div className={`tracker-line ${isIntermediate || isProfessional ? "active-line" : ""}`} />

//         <div className={`tracker-step ${isIntermediate || isProfessional ? "active" : ""}`}>
//           <span className="dot" />
//           <p>Intermediate</p>
//         </div>

//         <div className={`tracker-line ${isProfessional ? "active-line" : ""}`} />

//         <div className={`tracker-step ${isProfessional ? "active" : ""}`}>
//           <span className="dot" />
//           <p>Professional</p>
//         </div>
//       </div>

//       {/* ===== Profile Header ===== */}
//       <div className="profile-header">
//         <div className="profile-avatar">👤</div>
//         <div>
//           <h2>Arjun Mehta</h2>
//           <p>Wedding & Fashion Photographer</p>
//         </div>
//       </div>

//       {/* ===== Basic Information ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Basic Information</h3>

//         <div className="card-body">
//           <div className="input-box">Full Name</div>
//           <div className="input-box">Display Name</div>
//           <div className="input-box">Email</div>
//           <div className="input-box">Phone No.</div>
//         </div>

        
//       </div>

//       {/* ===== Professional Details ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Professional Details</h3>

//         <div className="card-body">
//           <div className="input-box dropdown">Photographer Type</div>
//           <div className="input-box dropdown">Years of Experience</div>
//           <div className="input-box">Primary Location</div>
//           <div className="input-box dropdown">Willing to Travel</div>
//           <div className="input-box dropdown">Languages Spoken</div>
//         </div>

//         {/* ✅ SINGLE SAVE BUTTON NEAR FORM */}
//         <div className="form-action  mt-4" style={{textAlign:"center", width:"500px"}} >
//           <button className="save-btn">Save</button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProfilePage;


import React from "react";
import "./ProfilePage.css";

const CURRENT_LEVEL = "intermediate";

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
      </div>

      {/* ===== About You ===== */}
      <div className="profile-card">
        <h3 className="section-title">About You</h3>

        <div className="card-body">
          <div className="input-box about-box">
            Write Something About You...
          </div>
        </div>
      </div>

      {/* ===== Services & Styles ===== */}
      <div className="profile-card">
        <h3 className="section-title">Services and Styles</h3>

        <div className="card-body services-grid">
          <label><input type="checkbox" /> Wedding Photography</label>
          <label><input type="checkbox" /> Pre-Wedding Photography</label>
          <label><input type="checkbox" /> Fashion Photography</label>
          <label><input type="checkbox" /> Corporate Photography</label>
          <label><input type="checkbox" /> Event Shooting Style</label>
          <label><input type="checkbox" /> Food Photography</label>
          <label><input type="checkbox" /> Product Photography</label>
          <label><input type="checkbox" /> Documentary</label>
          <label><input type="checkbox" /> Candid</label>
          <label><input type="checkbox" /> Editorial</label>
        </div>
      </div>

      {/* ===== Availability Settings ===== */}
      <div className="profile-card">
        <h3 className="section-title">Availability Settings</h3>

        <div className="card-body">
          <div className="input-box dropdown">Availability Status</div>
          <div className="input-box dropdown">Working Days</div>
          <div className="input-box dropdown">Preferred Time Slots</div>
          <div className="input-box dropdown">Max Bookings Per Day</div>
        </div>
      </div>

      {/* ===== Pricing Basics ===== */}
      {/* <div className="profile-card">
        <h3 className="section-title">Pricing Basics</h3>

        <div className="card-body pricing-row">
          <div className="input-box dropdown price-box">
            Starting Price $
          </div>

          <div className="toggle-wrapper">
            <span>Custom Quotes</span>
            <div className="toggle-switch"></div>
          </div>
        </div>
      </div> */}

      {/* ===== Bank Details ===== */}
      <div className="profile-card">
        <h3 className="section-title">Bank Details</h3>

        <div className="card-body">
          <div className="input-box">Account Holder Name</div>
          <div className="input-box">Bank Name</div>
          <div className="input-box">Account Number</div>
          <div className="input-box">Confirm Account Number</div>
          <div className="input-box">IFSC Code</div>

          <div className="radio-group">
            <label><input type="radio" name="accountType" /> Savings</label>
            <label><input type="radio" name="accountType" /> Current</label>
          </div>
        </div>
      </div>

      {/* ===== Final Save Button ===== */}
      <div className="final-save-wrapper">
        <button className="final-save-btn">Save Details</button>
      </div>

    </div>
  );
};

export default ProfilePage;
