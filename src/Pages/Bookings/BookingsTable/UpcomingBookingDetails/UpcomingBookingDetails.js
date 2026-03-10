// import React, { useEffect, useState } from "react";
// import "./UpcomingBookingDetails.css";
// import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
// import Loader from "../../../../Loader/Loader";

// const UpcomingBookingDetails = ({ booking, onBack }) => {
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* ===== Helper Function for Capitalization ===== */
//   const capitalizeFirst = (text) => {
//     if (!text) return "";
//     return text.charAt(0).toUpperCase() + text.slice(1);
//   };

//   useEffect(() => {
//     const fetchBookingById = async () => {
//       try {
//         setLoading(true);

//         const res = await getAcceptedBookingById(booking?.shootId);

//         if (res?.data?.success) {
//           setBookingData(res.data.data.booking);
//         }
//       } catch (error) {
//         console.error("Fetch booking by ID error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (booking?.shootId) {
//       fetchBookingById();
//     }
//   }, [booking?.shootId]);

//   /* ================= LOADER HANDLING ================= */

//   if (loading) return <Loader />;

//   if (!bookingData) {
//     return (
//       <div style={{ padding: "30px" }}>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="details-container">
//       <div className="details-header">
//         <button onClick={onBack} className="back-btn">
//           ← Back
//         </button>

//         <div className="booking-id-badge">
//           Booking ID: {bookingData._id}
//         </div>
//       </div>

//       <div className="details-card">

//         <div className="section-title">Client Information</div>

//         <div className="details-grid">
//           <div>
//             <label>Client Name</label>
//             <p>{capitalizeFirst(bookingData.client_id?.username)}</p>
//           </div>

//           <div>
//             <label>Email</label>
//             <p>{bookingData.client_id?.email}</p>
//           </div>

//           <div>
//             <label>Mobile</label>
//             <p>{bookingData.client_id?.mobileNumber}</p>
//           </div>

//           <div>
//             <label>Service</label>
//             <p>{capitalizeFirst(bookingData.service_id?.serviceName)}</p>
//           </div>
//         </div>

//         <div className="section-title">Event Details</div>

//         <div className="details-grid">
//           <div>
//             <label>Event Type</label>
//             <p>{capitalizeFirst(bookingData.eventType)}</p>
//           </div>

//           <div>
//             <label>Date</label>
//             <p>{bookingData.date}</p>
//           </div>

//           {/* <div>
//             <label>Time</label>
//             <p>{bookingData.time}</p>
//           </div> */}

//           <div>
//             <label>Location</label>
//             <p>
//               {bookingData.flatOrHouseNo}, {bookingData.streetName},{" "}
//               {capitalizeFirst(bookingData.city)}, {capitalizeFirst(bookingData.state)} -{" "}
//               {bookingData.postalCode}
//             </p>
//           </div>
//         </div>

//         <div className="section-title">Payment & Status</div>

//         <div className="details-grid">
//           <div>
//             <label>Total Amount</label>
//             <p>₹ {bookingData.totalAmount}</p>
//           </div>

//           <div>
//             <label>Payment Status :</label>
//             <span className="status-badge">
//               {capitalizeFirst(bookingData.paymentStatus)}
//             </span>
//           </div>

//           <div>
//             <label>Booking Status :</label>
//             <span className="status-badge">
//               {capitalizeFirst(bookingData.bookingStatus)}
//             </span>
//           </div>

//           <div>
//             <label>Current Status :</label>
//             <span className="status-badge">
//               {capitalizeFirst(bookingData.status)}
//             </span>
//           </div>
//         </div>

//         {bookingData.requirements && (
//           <>
//             <div className="section-title">Requirements</div>
//             <div className="requirements-box">
//               {capitalizeFirst(bookingData.requirements)}
//             </div>
//           </>
//         )}
//       </div>

//       {/* UPLOAD SECTION */}
//       <div className="upload-box">
//         <p>Drag and Drop photos here</p>
//         <span>OR </span>
//         <button className="upload-btn">
//           Upload to Cloud
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpcomingBookingDetails;




import React, { useEffect, useState, useRef } from "react";
import "./UpcomingBookingDetails.css";
import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
import {
  startGalleryUpload,
  uploadGalleryChunk,
  completeGalleryUpload,
} from "../../../../utils/APIs/gallaryUploadApis";
import Loader from "../../../../Loader/Loader";
import Loader2 from "../../../../Template/Loader/Loader2";
import { toast } from "react-toastify";

const UpcomingBookingDetails = ({ booking, onBack }) => {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);

  const fileInputRef = useRef(null);

  /* ===== Helper Function ===== */

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  /* ================= FETCH BOOKING ================= */

  useEffect(() => {
    const fetchBookingById = async () => {
      try {
        setLoading(true);

        const res = await getAcceptedBookingById(booking?.shootId);

        if (res?.data?.success) {
          setBookingData(res.data.data.booking);
        }
      } catch {
        toast.error("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    if (booking?.shootId) fetchBookingById();
  }, [booking?.shootId]);

  /* ================= FILE SELECT ================= */

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files));
  };

  /* ================= UPLOAD FUNCTION ================= */

  const handleUpload = async (selectedFiles) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      let totalPartsAllFiles = 0;
      let uploadedParts = 0;

      const CHUNK_SIZE = 50 * 1024 * 1024;

      selectedFiles.forEach((file) => {
        totalPartsAllFiles += Math.ceil(file.size / CHUNK_SIZE);
      });

      for (const file of selectedFiles) {

        const startRes = await startGalleryUpload({
          fileName: file.name,
          fileType: file.type,
        });

        const { key, uploadId } = startRes.data;

        const totalParts = Math.ceil(file.size / CHUNK_SIZE);

        let parts = [];

        for (let partNumber = 1; partNumber <= totalParts; partNumber++) {

          const start = (partNumber - 1) * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);

          const chunkFile = file.slice(start, end);

          const formData = new FormData();
          formData.append("key", key);
          formData.append("uploadId", uploadId);
          formData.append("partNumber", partNumber.toString());
          formData.append("chunk", chunkFile);

          const chunkRes = await uploadGalleryChunk(formData);

          parts.push({
            ETag: chunkRes.data?.ETag || chunkRes.data?.data?.ETag,
            PartNumber: partNumber,
          });

          uploadedParts++;

          const percent = Math.round(
            (uploadedParts / totalPartsAllFiles) * 100
          );

          setUploadProgress(percent);
        }

        await completeGalleryUpload({
          key,
          uploadId,
          parts,
          bookingid: bookingData._id,
          clientId: bookingData.client_id?._id,
          photographerId: bookingData.photographer_id,
          veroaBookingId: bookingData.bookingId,
        });
      }

      toast.success("Files uploaded successfully 🎉");

      setFiles([]);
      setUploadProgress(0);

    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  /* ================= LOADER ================= */

  if (loading) return <Loader />;

  if (uploading) return <Loader2 percentage={uploadProgress} />;

  if (!bookingData) {
    return (
      <div style={{ padding: "30px" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={onBack} className="back-btn">
          ← Back
        </button>

        <div className="booking-id-badge">
          Booking ID: {bookingData._id}
        </div>
      </div>

      <div className="details-card">

        <div className="section-title">Client Information</div>

        <div className="details-grid">
          <div>
            <label>Client Name</label>
            <p>{capitalizeFirst(bookingData.client_id?.username)}</p>
          </div>

          <div>
            <label>Email</label>
            <p>{bookingData.client_id?.email}</p>
          </div>

          <div>
            <label>Mobile</label>
            <p>{bookingData.client_id?.mobileNumber}</p>
          </div>

          <div>
            <label>Service</label>
            <p>{capitalizeFirst(bookingData.service_id?.serviceName)}</p>
          </div>
        </div>

        <div className="section-title">Event Details</div>

        <div className="details-grid">
          <div>
            <label>Event Type</label>
            <p>{capitalizeFirst(bookingData.eventType)}</p>
          </div>

          <div>
            <label>Date</label>
            <p>{bookingData.date}</p>
          </div>

          <div>
            <label>Location</label>
            <p>
              {bookingData.flatOrHouseNo}, {bookingData.streetName},{" "}
              {capitalizeFirst(bookingData.city)}, {capitalizeFirst(bookingData.state)} -{" "}
              {bookingData.postalCode}
            </p>
          </div>
        </div>

        <div className="section-title">Payment & Status</div>

        <div className="details-grid">
          <div>
            <label>Total Amount</label>
            <p>₹ {bookingData.totalAmount}</p>
          </div>

          <div>
            <label>Payment Status :</label>
            <span className="status-badge">
              {capitalizeFirst(bookingData.paymentStatus)}
            </span>
          </div>

          <div>
            <label>Booking Status :</label>
            <span className="status-badge">
              {capitalizeFirst(bookingData.bookingStatus)}
            </span>
          </div>

          <div>
            <label>Current Status :</label>
            <span className="status-badge">
              {capitalizeFirst(bookingData.status)}
            </span>
          </div>
        </div>

        {bookingData.requirements && (
          <>
            <div className="section-title">Requirements</div>
            <div className="requirements-box">
              {capitalizeFirst(bookingData.requirements)}
            </div>
          </>
        )}
      </div>

      {/* UPLOAD SECTION */}
      <div className="upload-box">
        <p>Drag and Drop photos here</p>
        <span>OR </span>

        <button
          className="upload-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Upload to Cloud
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
        />

        {files.length > 0 && (
          <button
            className="upload-btn"
            onClick={() => handleUpload(files)}
            style={{ marginTop: "10px" }}
          >
            Submit Upload ({files.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default UpcomingBookingDetails;