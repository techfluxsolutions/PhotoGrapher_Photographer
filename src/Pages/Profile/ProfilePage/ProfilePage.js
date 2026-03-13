import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { getProfilePhotographer, updateProfilePhotographer } from "../../../utils/APIs/profileApis";
import { toast } from "react-toastify";
import { FiPlus, FiUser } from "react-icons/fi";
import Loader from "../../../Template/Loader/Loader";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const CURRENT_LEVEL = profileData?.professionalDetails?.expertiseLevel || "";

  const isInitio = CURRENT_LEVEL === "INITIO";
const isPro = CURRENT_LEVEL === "PRO";
const isElite = CURRENT_LEVEL === "ELITE";

const handleProfilePhotoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setProfileImageFile(file); // store file for API

  setProfileData({
    ...profileData,
    basicInfo: {
      ...profileData.basicInfo,
      profilePhoto: imageUrl, // preview only
    },
  });
};
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfilePhotographer();
      setProfileData(res?.data?.photographer);
    } catch (error) {
      console.error("Failed to fetch photographer profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
  try {
    if (profileData?.confirm_account_number !== profileData?.account_number) {
      toast.error("Account numbers not matching please check!");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    // append profile image
    if (profileImageFile) {
      formData.append("profilePhoto", profileImageFile);
    }

    // append remaining data
    formData.append("data", JSON.stringify(profileData));

    await updateProfilePhotographer(formData);

    // alert("Profile updated successfully");
  } catch (error) {
    console.error("Failed to update profile", error);
  } finally {
    setLoading(false);
  }
};

  const handleCheckboxChange = (section, field) => {
    setProfileData((prev) => ({
      ...prev,
      servicesAndStyles: {
        ...prev.servicesAndStyles,
        [section]: {
          ...prev.servicesAndStyles[section],
          [field]: !prev.servicesAndStyles[section][field],
        },
      },
    }));
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-page-wrapper">

      {/* ===== Level Tracker ===== */}
    <div className="level-tracker">

  <div className={`tracker-step ${isInitio || isPro || isElite ? "active" : ""}`}>
    <span className="dot" />
    <p>Initio</p>
  </div>

  <div className={`tracker-line ${isPro || isElite ? "active-line" : ""}`} />

  <div className={`tracker-step ${isPro || isElite ? "active" : ""}`}>
    <span className="dot" />
    <p>Pro</p>
  </div>

  <div className={`tracker-line ${isElite ? "active-line" : ""}`} />

  <div className={`tracker-step ${isElite ? "active" : ""}`}>
    <span className="dot" />
    <p>Elite</p>
  </div>

</div>

      {/* ===== Profile Header ===== */}
      {/* <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div>
          <h2>{profileData?.basicInfo?.fullName || "Photographer Name"}</h2>
          <p>
            {profileData?.professionalDetails?.photographerType
              ? `${profileData.professionalDetails.photographerType} Photographer`
              : "Type of Photographer "}
          </p>
        </div>
      </div> */}

      <div className="profile-header">
  <div className="profile-avatar-wrapper">

    <div className="profile-avatar">
      {profileData?.basicInfo?.profilePhoto ? (
        <img
          src={profileData.basicInfo.profilePhoto}
          alt="profile"
        />
      ) : (
        <FiUser size={40} color="#9ca3af" />
      )}
    </div>

    <label className="profile-upload-btn">
      <FiPlus size={18} />
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePhotoChange}
        hidden
      />
    </label>

  </div>

  <div>
    <h2>{profileData?.basicInfo?.fullName || "Photographer Name"}</h2>
    <p>
      {profileData?.professionalDetails?.photographerType
        ? `${profileData.professionalDetails.photographerType} Photographer`
        : "Type of Photographer "}
    </p>
  </div>
</div>

      {/* ===== Basic Information ===== */}
      <div className="profile-card">
        <h3 className="section-title">Basic Information</h3>

        <div className="card-body">
          {/* <div className="input-box">
            {profileData?.basicInfo?.fullName || "Full Name"}
          </div> */}
           <label className="profile-label">Full Name</label>
          <input
            className="input-box"
            value={profileData?.basicInfo?.fullName || ""}
            placeholder="Full Name"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                basicInfo: {
                  ...profileData.basicInfo,
                  fullName: e.target.value,
                },
              })
            }
          />

          {/* <div className="input-box">
            {profileData?.basicInfo?.displayName || "Display Name"}
          </div> */}
            <label className="profile-label">Display Name</label>
          <input
            className="input-box"
            value={profileData?.basicInfo?.displayName || ""}
            placeholder="Display Name"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                basicInfo: {
                  ...profileData.basicInfo,
                  displayName: e.target.value,
                },
              })
            }
          />
          {/* <div className="input-box">
            {profileData?.basicInfo?.email || "Email"}
          </div> */}
          <label className="profile-label">Email</label>
          <input
            className="input-box"
            value={profileData?.basicInfo?.email || ""}
            placeholder="Email"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                basicInfo: {
                  ...profileData.basicInfo,
                  email: e.target.value,
                },
              })
            }
          />

          {/* <div className="input-box">
            {profileData?.basicInfo?.phone || "Phone No."}
          </div> */}
          <label className="profile-label">Phone No.</label>
          <input
            className="input-box"
            value={profileData?.basicInfo?.phone || ""}
            placeholder="Phone No."
            onChange={(e) =>
              setProfileData({
                ...profileData,
                basicInfo: {
                  ...profileData.basicInfo,
                  phone: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      {/* ===== Professional Details ===== */}
      <div className="profile-card">
        <h3 className="section-title">Professional Details</h3>

        <div className="card-body">
          {/* <div className="input-box dropdown">
            {profileData?.professionalDetails?.photographerType || "Photographer Type"}
          </div> */}
          <label className="profile-label">Photographer Type</label>
          <input
            className="input-box"
            value={profileData?.professionalDetails?.photographerType || ""}
            placeholder="Photographer Type"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                professionalDetails: {
                  ...profileData.professionalDetails,
                  photographerType: e.target.value,
                },
              })
            }
          />

          {/* <div className="input-box dropdown">
            {profileData?.professionalDetails?.yearsOfExperience || "Years of Experience"}
          </div> */}
           <label className="profile-label">Years of Experience</label>
          <input
            className="input-box"
            value={profileData?.professionalDetails?.yearsOfExperience || ""}
            placeholder="Years of Experience"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                professionalDetails: {
                  ...profileData.professionalDetails,
                  yearsOfExperience: e.target.value,
                },
              })
            }
          />
          {/* <div className="input-box">
            {profileData?.professionalDetails?.primaryLocation || "Primary Location"}
          </div> */}
           <label className="profile-label">Primary Location</label>

          <input
            className="input-box"
            value={profileData?.professionalDetails?.primaryLocation || ""}
            placeholder="Primary Location"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                professionalDetails: {
                  ...profileData.professionalDetails,
                  primaryLocation: e.target.value,
                },
              })
            }
          />

          {/* <div className="input-box dropdown">
            {profileData?.professionalDetails?.willingToTravel !== undefined
              ? profileData.professionalDetails.willingToTravel
                ? "Yes"
                : "No"
              : "Willing to Travel"}
          </div> */}

          <label className="profile-label">Willing to Travel</label>

          <select
            className="input-box"
            value={profileData?.professionalDetails?.willingToTravel ?? ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                professionalDetails: {
                  ...profileData.professionalDetails,
                  willingToTravel: e.target.value === "true",
                },
              })
            }
          >
            <option value="">Willing To Travel</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {/* <div className="input-box dropdown">
            {profileData?.professionalDetails?.languagesSpoken?.length
              ? profileData.professionalDetails.languagesSpoken.join(", ")
              : "Languages Spoken"}
          </div> */}
          <label className="profile-label">Languages Spoken</label>
          <input
            className="input-box"
            placeholder="Languages Spoken (comma separated)"
            value={profileData?.professionalDetails?.languagesSpoken?.join(", ") || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                professionalDetails: {
                  ...profileData.professionalDetails,
                  languagesSpoken: e.target.value
                    .split(",")
                    .map((lang) => lang.trim()),
                },
              })
            }
          />
        </div>
      </div>

      {/* ===== About You ===== */}
      <div className="profile-card">
        <h3 className="section-title">About You</h3>
        <div className="card-body">
          {/* <div className="input-box about-box">
            {profileData?.aboutYou || "Write Something About You..."}
          </div> */}
          <textarea
            className="input-box about-box"
            value={profileData?.aboutYou || ""}
            placeholder="Write Something About You..."
            onChange={(e) =>
              setProfileData({
                ...profileData,
                aboutYou: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* ===== Services & Styles ===== */}
      <div className="profile-card">
        <h3 className="section-title">Services and Styles</h3>

        <div className="card-body services-grid">

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.services?.weddingPhotography || false}
              onChange={() => handleCheckboxChange("services", "weddingPhotography")}
            />
            Wedding Photography
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.services?.preWeddingPhotography || false}
              onChange={() => handleCheckboxChange("services", "preWeddingPhotography")}
            />
            Pre-Wedding Photography
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.services?.fashionPhotography || false}
              onChange={() => handleCheckboxChange("services", "fashionPhotography")}
            />
            Fashion Photography
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.services?.corporatePhotography || false}
              onChange={() => handleCheckboxChange("services", "corporatePhotography")}
            />
            Corporate Photography
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.services?.foodPhotography || false}
              onChange={() => handleCheckboxChange("services", "foodPhotography")}
            />
            Food Photography
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.services?.productPhotography || false}
              onChange={() => handleCheckboxChange("services", "productPhotography")}
            />
            Product Photography
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.styles?.documentary || false}
              onChange={() => handleCheckboxChange("styles", "documentary")}
            />
            Documentary
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.styles?.candid || false}
              onChange={() => handleCheckboxChange("styles", "candid")}
            />
            Candid
          </label>

          <label className="profile-label">
            <input
              type="checkbox"
              checked={profileData?.servicesAndStyles?.styles?.editorial || false}
              onChange={() => handleCheckboxChange("styles", "editorial")}
            />
            Editorial
          </label>

        </div>
      </div>
     

      {/* ===== Availability Settings ===== */}
      <div className="profile-card">
        <h3 className="section-title">Availability Settings</h3>

        <div className="card-body">
          {/* <div className="input-box dropdown">
            {profileData?.availability?.status || "Availability Status"}
          </div> */}
          <label className="profile-label">Availability Status</label>
          <input
            className="input-box"
            value={profileData?.availability?.status || ""}
            placeholder="Availability Status"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                availability: {
                  ...profileData.availability,
                  status: e.target.value,
                },
              })
            }
          />

       
          <label className="profile-label">Working Days</label>
          <input
            className="input-box"
            placeholder="Working Days (comma separated)"
            value={profileData?.availability?.workingDays?.join(", ") || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                availability: {
                  ...profileData.availability,
                  workingDays: e.target.value
                    .split(",")
                    .map((day) => day.trim()),
                },
              })
            }
          />

           <label className="profile-label">Preferred Time Slots</label>

          <input
            className="input-box"
            placeholder="Preferred Time Slots (comma separated)"
            value={profileData?.availability?.preferredTimeSlots?.join(", ") || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                availability: {
                  ...profileData.availability,
                  preferredTimeSlots: e.target.value
                    .split(",")
                    .map((slot) => slot.trim()),
                },
              })
            }
          />
         
          <label className="profile-label">Max Bookings Per Day</label>
          <input
            type="number"
            className="input-box"
            placeholder="Max Bookings Per Day"
            value={profileData?.availability?.maxBookingsPerDay || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                availability: {
                  ...profileData.availability,
                  maxBookingsPerDay: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      {/* ===== Bank Details ===== */}
      <div className="profile-card">
        <h3 className="section-title">Bank Details</h3>

       
        <div className="card-body">
          <label className="profile-label">Full Name</label>
          {/* Account Holder Name */}
          <input
            className="input-box"
            placeholder="Account Holder Name"
            value={profileData?.basicInfo?.fullName || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                basicInfo: {
                  ...profileData.basicInfo,
                  fullName: e.target.value,
                },
              })
            }
          />

          {/* Bank Name */}
           <label className="profile-label">Bank Name</label>
          <input
            className="input-box"
            placeholder="Bank Name"
            value={profileData?.bank_name || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                bank_name: e.target.value,
              })
            }
          />

          {/* Account Number */}
          <label className="profile-label">Account Number</label>
          <input
            className="input-box"
            placeholder="Account Number"
            value={profileData?.account_number || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                account_number: e.target.value,
              })
            }
          />

          {/* Confirm Account Number */}
          <label className="profile-label">Confirm Account Number</label>
          <input
            className="input-box"
            placeholder="Confirm Account Number"
            value={profileData?.confirm_account_number || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                confirm_account_number: e.target.value,
              })
            }
          />

          {/* IFSC Code */}
          <label className="profile-label">IFSC Code</label>
          <input
            className="input-box"
            placeholder="IFSC Code"
            value={profileData?.ifsc_code || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                ifsc_code: e.target.value,
              })
            }
          />

          {/* Account Type */}
           <label className="profile-label"> Account Type</label>
          <div className="radio-group">
            <label className="profile-label">
              <input
                type="radio"
                name="accountType"
                checked={profileData?.account_type === "Savings"}
                onChange={() =>
                  setProfileData({
                    ...profileData,
                    account_type: "Savings",
                  })
                }
              />
              Savings
            </label>

            <label className="profile-label">
              <input
                type="radio"
                name="accountType"
                checked={profileData?.account_type === "Current"}
                onChange={() =>
                  setProfileData({
                    ...profileData,
                    account_type: "Current",
                  })
                }
              />
              Current
            </label>
          </div>

        </div>
      </div>

      {/* ===== Final Save Button ===== */}
      <div className="final-save-wrapper">
        {/* <button className="final-save-btn">Save Details</button> */}
        <button className="final-save-btn w-50" onClick={handleSaveProfile}>
          Save Details
        </button>
      </div>

    </div>
  );
};

export default ProfilePage;



