// import React, { useEffect, useState, useRef } from "react";
// import "./UpcomingBookingDetails.css";
// import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
// import {
//   startGalleryUpload,
//   uploadGalleryChunk,
//   completeGalleryUpload,
// } from "../../../../utils/APIs/gallaryUploadApis";
// import { toast } from "react-toastify";
// import { FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../../../Template/Loader/Loader";
// import Loader2 from "../../../../Template/Loader2/Loader2";

// const UpcomingBookingDetails = ({ booking, onBack }) => {

//   const navigate = useNavigate();

//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [files, setFiles] = useState([]);

//   const fileInputRef = useRef(null);

//   /* ===== Helper Function ===== */

//   const capitalizeFirst = (text) => {
//     if (!text) return "";
//     return text.charAt(0).toUpperCase() + text.slice(1);
//   };

//   /* ================= FETCH BOOKING ================= */

//   useEffect(() => {
//     const fetchBookingById = async () => {
//       try {
//         setLoading(true);

//         const res = await getAcceptedBookingById(booking?.shootId);

//         if (res?.data?.success) {
//           setBookingData(res.data.data.booking);
//         }
//       } catch {
//         toast.error("Failed to fetch booking details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (booking?.shootId) fetchBookingById();
//   }, [booking?.shootId]);

//   /* ================= FILE SELECT ================= */

//   const handleFileSelect = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   /* ================= UPLOAD FUNCTION ================= */

//   const handleUpload = async (selectedFiles) => {
//     try {
//       setUploading(true);
//       setUploadProgress(0);

//       let totalPartsAllFiles = 0;
//       let uploadedParts = 0;

//       const CHUNK_SIZE = 50 * 1024 * 1024;

//       selectedFiles.forEach((file) => {
//         totalPartsAllFiles += Math.ceil(file.size / CHUNK_SIZE);
//       });

//       for (const file of selectedFiles) {

//         const startRes = await startGalleryUpload({
//           fileName: file.name,
//           fileType: file.type,
//           relativePath,
//           veroaBookingId: bookingData.veroaBookingId,
//           fileSize: file.size,
//         });

//         const { key, uploadId } = startRes.data;

//         const totalParts = Math.ceil(file.size / CHUNK_SIZE);

//         let parts = [];

//         for (let partNumber = 1; partNumber <= totalParts; partNumber++) {

//           const start = (partNumber - 1) * CHUNK_SIZE;
//           const end = Math.min(start + CHUNK_SIZE, file.size);

//           const chunkFile = file.slice(start, end);

//           const formData = new FormData();
//           formData.append("key", key);
//           formData.append("uploadId", uploadId);
//           formData.append("partNumber", partNumber.toString());
//           formData.append("chunk", chunkFile);

//           const chunkRes = await uploadGalleryChunk(formData);

//           parts.push({
//             ETag: chunkRes.data?.ETag || chunkRes.data?.data?.ETag,
//             PartNumber: partNumber,
//           });

//           uploadedParts++;

//           const percent = Math.round(
//             (uploadedParts / totalPartsAllFiles) * 100
//           );

//           setUploadProgress(percent);
//         }

//         await completeGalleryUpload({
//           key,
//           uploadId,
//           parts,
//           bookingid: bookingData._id,
//           clientId: bookingData.client_id?._id,
//           photographerId: bookingData.photographer_id,
//           veroaBookingId: bookingData.bookingId,
//         });
//       }

//       toast.success("Files uploaded successfully 🎉");

//       setFiles([]);
//       setUploadProgress(0);

//     } catch {
//       toast.error("Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ================= LOADER ================= */

//   if (loading) return <Loader />;

//   if (uploading) return <Loader2 percentage={uploadProgress} />;

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

//       {/* DETAILS CARD */}
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

//       </div>

//       {/* UPLOAD SECTION */}

//       <div className="upload-box">

//         <p>Drag and Drop photos here</p>
//         <span>OR</span>

//         <div className="upload-actions">

//           <button
//             className="upload-btn"
//             onClick={() => fileInputRef.current.click()}
//           >
//             Upload to Cloud
//           </button>

//           <input
//             ref={fileInputRef}
//             type="file"
//             hidden
//             multiple
//             accept="image/*,video/*"
//             onChange={handleFileSelect}
//           />

//             <input
//             ref={fileInputRef}
//             type="file"
//             hidden
//             multiple
//             accept="image/*,video/*"
//             onChange={handleFileSelect}
//           />

//              <label className="upload-btn">

//             Select Folder

//             <input
//               type="file"
//               hidden
//               multiple
//               webkitdirectory="true"
//               onChange={handleFileSelect}
//             />

//           </label>

//           {files.length > 0 && (
//             <button
//               className="upload-btn"
//               onClick={() => handleUpload(files)}
//               style={{ marginTop: "10px" }}
//             >
//               Submit Upload ({files.length})
//             </button>
//           )}

//         </div>

//         {/* VIEW GALLERY BUTTON */}

//         <button
//   className="upload-btn"
//   onClick={() =>
//     navigate(
//       `/gallery/${bookingData._id}/${
//         bookingData.photographer_id?._id || bookingData.photographer_id
//       }/${bookingData.client_id?._id}`
//     )
//   }
// >
//   <FaEye style={{ marginRight: "6px" }} />
//   View Gallery
// </button>

//       </div>

//     </div>
//   );
// };

// export default UpcomingBookingDetails;





import React, { useEffect, useState, useRef } from "react";
import "./UpcomingBookingDetails.css";
import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
import {
  startUploadAPI,
  getPartUploadUrlAPI,
  completeUploadAPI,
} from "../../../../utils/APIs/gallaryUploadApis";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Template/Loader/Loader";
import Loader2 from "../../../../Template/Loader2/Loader2";

const UpcomingBookingDetails = ({ booking, onBack }) => {

  const navigate = useNavigate();

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

        const startRes = await startUploadAPI({
          fileName: file.name,
          fileType: file.type,
          relativePath,
          veroaBookingId: bookingData.veroaBookingId,
          fileSize: file.size,
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

          const chunkRes = await getPartUploadUrlAPI(formData);

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

        await completeUploadAPI({
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

      {/* DETAILS CARD */}
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

      </div>

      {/* UPLOAD SECTION */}

      <div className="upload-box">

        <p>Drag and Drop photos here</p>
        <span>OR</span>

        <div className="upload-actions">

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

            <input
            ref={fileInputRef}
            type="file"
            hidden
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
          />

             <label className="upload-btn">

            Select Folder

            <input
              type="file"
              hidden
              multiple
              webkitdirectory="true"
              onChange={handleFileSelect}
            />

          </label>

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

        {/* VIEW GALLERY BUTTON */}

        <button
  className="upload-btn"
  onClick={() =>
    navigate(
      `/gallery/${bookingData._id}/${
        bookingData.photographer_id?._id || bookingData.photographer_id
      }/${bookingData.client_id?._id}`
    )
  }
>
  <FaEye style={{ marginRight: "6px" }} />
  View Gallery
</button>

      </div>

    </div>
  );
};

export default UpcomingBookingDetails;