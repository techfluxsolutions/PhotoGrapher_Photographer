// import React from "react";
// import "./ProfilePage.css";

// const CURRENT_LEVEL = "intermediate";

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
//       </div>

//       {/* ===== About You ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">About You</h3>

//         <div className="card-body">
//           <div className="input-box about-box">
//             Write Something About You...
//           </div>
//         </div>
//       </div>

//       {/* ===== Services & Styles ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Services and Styles</h3>

//         <div className="card-body services-grid">
//           <label><input type="checkbox" /> Wedding Photography</label>
//           <label><input type="checkbox" /> Pre-Wedding Photography</label>
//           <label><input type="checkbox" /> Fashion Photography</label>
//           <label><input type="checkbox" /> Corporate Photography</label>
//           <label><input type="checkbox" /> Event Shooting Style</label>
//           <label><input type="checkbox" /> Food Photography</label>
//           <label><input type="checkbox" /> Product Photography</label>
//           <label><input type="checkbox" /> Documentary</label>
//           <label><input type="checkbox" /> Candid</label>
//           <label><input type="checkbox" /> Editorial</label>
//         </div>
//       </div>

//       {/* ===== Availability Settings ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Availability Settings</h3>

//         <div className="card-body">
//           <div className="input-box dropdown">Availability Status</div>
//           <div className="input-box dropdown">Working Days</div>
//           <div className="input-box dropdown">Preferred Time Slots</div>
//           <div className="input-box dropdown">Max Bookings Per Day</div>
//         </div>
//       </div>


//       {/* ===== Bank Details ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Bank Details</h3>

//         <div className="card-body">
//           <div className="input-box">Account Holder Name</div>
//           <div className="input-box">Bank Name</div>
//           <div className="input-box">Account Number</div>
//           <div className="input-box">Confirm Account Number</div>
//           <div className="input-box">IFSC Code</div>

//           <div className="radio-group">
//             <label><input type="radio" name="accountType" /> Savings</label>
//             <label><input type="radio" name="accountType" /> Current</label>
//           </div>
//         </div>
//       </div>

//       {/* ===== Final Save Button ===== */}
//       <div className="final-save-wrapper">
//         <button className="final-save-btn">Save Details</button>
//       </div>

//     </div>
//   );
// };

// export default ProfilePage;



// import React, { useEffect, useState } from "react";
// import "./ProfilePage.css";
// import { getProfilePhotographer } from "../../../utils/APIs/profileApis";
// import Loader from "../../../Loader/Loader";


// const CURRENT_LEVEL = "intermediate";

// const ProfilePage = () => {
//   const [loading, setLoading] = useState(false);
//   const [profileData, setProfileData] = useState(null);

//   const isBeginner = CURRENT_LEVEL === "beginner";
//   const isIntermediate = CURRENT_LEVEL === "intermediate";
//   const isProfessional = CURRENT_LEVEL === "professional";

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const res = await getProfilePhotographer();
//       setProfileData(res?.data?.photographer);
//     } catch (error) {
//       console.error("Failed to fetch photographer profile", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;

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
//           <h2>{profileData?.basicInfo?.fullName || "Photographer Name"}</h2>
//           <p>
//             {profileData?.professionalDetails?.photographerType
//               ? `${profileData.professionalDetails.photographerType} Photographer`
//               : "Type of Photographer "}
//           </p>
//         </div>
//       </div>

//       {/* ===== Basic Information ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Basic Information</h3>

//         <div className="card-body">
//           <div className="input-box">
//             {profileData?.basicInfo?.fullName || "Full Name"}
//           </div>

//           <div className="input-box">
//             {profileData?.basicInfo?.displayName || "Display Name"}
//           </div>

//           <div className="input-box">
//             {profileData?.basicInfo?.email || "Email"}
//           </div>

//           <div className="input-box">
//             {profileData?.basicInfo?.phone || "Phone No."}
//           </div>
//         </div>
//       </div>

//       {/* ===== Professional Details ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Professional Details</h3>

//         <div className="card-body">
//           <div className="input-box dropdown">
//             {profileData?.professionalDetails?.photographerType || "Photographer Type"}
//           </div>

//           <div className="input-box dropdown">
//             {profileData?.professionalDetails?.yearsOfExperience || "Years of Experience"}
//           </div>

//           <div className="input-box">
//             {profileData?.professionalDetails?.primaryLocation || "Primary Location"}
//           </div>

//           <div className="input-box dropdown">
//             {profileData?.professionalDetails?.willingToTravel !== undefined
//               ? profileData.professionalDetails.willingToTravel
//                 ? "Yes"
//                 : "No"
//               : "Willing to Travel"}
//           </div>

//           <div className="input-box dropdown">
//             {profileData?.professionalDetails?.languagesSpoken?.length
//               ? profileData.professionalDetails.languagesSpoken.join(", ")
//               : "Languages Spoken"}
//           </div>
//         </div>
//       </div>

//       {/* ===== About You ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">About You</h3>
//         <div className="card-body">
//           <div className="input-box about-box">
//             {profileData?.aboutYou || "Write Something About You..."}
//           </div>
//         </div>
//       </div>

//       {/* ===== Services & Styles ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Services and Styles</h3>

//         <div className="card-body services-grid">
//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.services?.weddingPhotography || false}
//               readOnly
//             />
//             Wedding Photography
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.services?.preWeddingPhotography || false}
//               readOnly
//             />
//             Pre-Wedding Photography
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.services?.fashionPhotography || false}
//               readOnly
//             />
//             Fashion Photography
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.services?.corporatePhotography || false}
//               readOnly
//             />
//             Corporate Photography
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.services?.foodPhotography || false}
//               readOnly
//             />
//             Food Photography
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.services?.productPhotography || false}
//               readOnly
//             />
//             Product Photography
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.styles?.documentary || false}
//               readOnly
//             />
//             Documentary
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.styles?.candid || false}
//               readOnly
//             />
//             Candid
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={profileData?.servicesAndStyles?.styles?.editorial || false}
//               readOnly
//             />
//             Editorial
//           </label>
//         </div>
//       </div>

//       {/* ===== Availability Settings ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Availability Settings</h3>

//         <div className="card-body">
//           <div className="input-box dropdown">
//             {profileData?.availability?.status || "Availability Status"}
//           </div>

//           <div className="input-box dropdown">
//             {profileData?.availability?.workingDays?.length
//               ? profileData.availability.workingDays.join(", ")
//               : "Working Days"}
//           </div>

//           <div className="input-box dropdown">
//             {profileData?.availability?.preferredTimeSlots?.length
//               ? profileData.availability.preferredTimeSlots.join(", ")
//               : "Preferred Time Slots"}
//           </div>

//           <div className="input-box dropdown">
//             {profileData?.availability?.maxBookingsPerDay || "Max Bookings Per Day"}
//           </div>
//         </div>
//       </div>

//       {/* ===== Bank Details ===== */}
//       <div className="profile-card">
//         <h3 className="section-title">Bank Details</h3>

//         <div className="card-body">
//           <div className="input-box">
//             {profileData?.basicInfo?.fullName || "Account Holder Name"}
//           </div>

//           <div className="input-box">
//             {profileData?.bank_name || "Bank Name"}
//           </div>

//           <div className="input-box">Account Number</div>
//           <div className="input-box">Confirm Account Number</div>

//           <div className="input-box">IFSC Code</div>

//           <div className="radio-group">
//             <label>
//               <input
//                 type="radio"
//                 checked={profileData?.account_type === "Savings"}
//                 readOnly
//               />
//               Savings
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 checked={profileData?.account_type === "Current"}
//                 readOnly
//               />
//               Current
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* ===== Final Save Button ===== */}
//       <div className="final-save-wrapper">
//         <button className="final-save-btn">Save Details</button>
//       </div>

//     </div>
//   );
// };

// export default ProfilePage;



import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import {
  getProfilePhotographer,
  updateProfilePhotographer,
} from "../../../utils/APIs/profileApis";
import Loader from "../../../Loader/Loader";
import { toast } from "react-toastify";

const CURRENT_LEVEL = "intermediate";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfilePhotographer();
      setProfileData(res?.data?.photographer);
    } catch (error) {
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (section, field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleRootChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ---------- SAVE PROFILE ---------- */
  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await updateProfilePhotographer(profileData);
      toast.success(res?.data?.message || "Profile Updated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-page-wrapper">

      {/* ===== Profile Header ===== */}
      <div className="profile-header">
        <div className="profile-avatar">
          {profileData?.profilePhoto ? (
            <img src={profileData.profilePhoto} alt="profile" />
          ) : (
            "👤"
          )}

          {/* Pencil only for image */}
          <label className="image-edit-icon">
            ✏️
            <input
              type="file"
              hidden
              onChange={(e) =>
                handleRootChange("profilePhoto", e.target.files[0])
              }
            />
          </label>
        </div>

        <div>
          <h2>
            {profileData?.basicInfo?.fullName || "Photographer Name"}
          </h2>
          <p>
            {profileData?.professionalDetails?.photographerType ||
              "Type of Photographer"}
          </p>
        </div>
      </div>

      {/* ===== Basic Information ===== */}
      <div className="profile-card">
        <h3 className="section-title">Basic Information</h3>

        <div className="card-body">
          <input
            className="input-box"
            placeholder="Full Name"
            value={profileData?.basicInfo?.fullName || ""}
            onChange={(e) =>
              handleChange("basicInfo", "fullName", e.target.value)
            }
          />

          <input
            className="input-box"
            placeholder="Display Name"
            value={profileData?.basicInfo?.displayName || ""}
            onChange={(e) =>
              handleChange("basicInfo", "displayName", e.target.value)
            }
          />

          <input
            className="input-box"
            placeholder="Email"
            value={profileData?.basicInfo?.email || ""}
            onChange={(e) =>
              handleChange("basicInfo", "email", e.target.value)
            }
          />

          <input
            className="input-box"
            placeholder="Phone No."
            value={profileData?.basicInfo?.phone || ""}
            onChange={(e) =>
              handleChange("basicInfo", "phone", e.target.value)
            }
          />
        </div>
      </div>

      {/* ===== Professional Details ===== */}
      <div className="profile-card">
        <h3 className="section-title">Professional Details</h3>

        <div className="card-body">
          <input
            className="input-box dropdown"
            placeholder="Photographer Type"
            value={profileData?.professionalDetails?.photographerType || ""}
            onChange={(e) =>
              handleChange(
                "professionalDetails",
                "photographerType",
                e.target.value
              )
            }
          />

          <input
            className="input-box dropdown"
            placeholder="Years of Experience"
            value={
              profileData?.professionalDetails?.yearsOfExperience || ""
            }
            onChange={(e) =>
              handleChange(
                "professionalDetails",
                "yearsOfExperience",
                e.target.value
              )
            }
          />

          <input
            className="input-box"
            placeholder="Primary Location"
            value={profileData?.professionalDetails?.primaryLocation || ""}
            onChange={(e) =>
              handleChange(
                "professionalDetails",
                "primaryLocation",
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* ===== About You ===== */}
      <div className="profile-card">
        <h3 className="section-title">About You</h3>

        <div className="card-body">
          <textarea
            className="input-box about-box"
            placeholder="Write Something About You..."
            value={profileData?.aboutYou || ""}
            onChange={(e) =>
              handleRootChange("aboutYou", e.target.value)
            }
          />
        </div>
      </div>

      {/* ===== Availability ===== */}
      <div className="profile-card">
        <h3 className="section-title">Availability Settings</h3>

        <div className="card-body">
          <input
            className="input-box dropdown"
            placeholder="Availability Status"
            value={profileData?.availability?.status || ""}
            onChange={(e) =>
              handleChange("availability", "status", e.target.value)
            }
          />

          <input
            className="input-box dropdown"
            placeholder="Working Days"
            value={
              profileData?.availability?.workingDays?.join(", ") || ""
            }
            onChange={(e) =>
              handleChange(
                "availability",
                "workingDays",
                e.target.value.split(",").map((d) => d.trim())
              )
            }
          />
        </div>
      </div>

      {/* ===== Bank Details ===== */}
      <div className="profile-card">
        <h3 className="section-title">Bank Details</h3>

        <div className="card-body">
          <input
            className="input-box"
            placeholder="Bank Name"
            value={profileData?.bank_name || ""}
            onChange={(e) =>
              handleRootChange("bank_name", e.target.value)
            }
          />
        </div>
      </div>

      {/* ===== Save Button ===== */}
      <div className="final-save-wrapper">
        <button className="final-save-btn" onClick={handleSave}>
          Save Details
        </button>
      </div>

    </div>
  );
};

export default ProfilePage;
