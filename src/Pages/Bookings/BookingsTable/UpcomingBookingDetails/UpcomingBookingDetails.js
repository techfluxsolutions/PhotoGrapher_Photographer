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





import React, { useEffect, useState, useRef, useCallback } from "react";
import "./UpcomingBookingDetails.css";
import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
import {
  startUploadAPI,
  getPartUploadUrlAPI,
  completeUploadAPI,
} from "../../../../utils/APIs/gallaryUploadApis";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../Template/Loader/Loader";
import Loader2 from "../../../../Template/Loader2/Loader2";
import axios from "axios";

const UpcomingBookingDetails = ({ booking, onBack }) => {


   const pauseRef = useRef(false);
    const cancelRef = useRef(false);
    const uploadedBytesRef = useRef(0);
    const totalBytesRef = useRef(0);
    const [statusText, setStatusText] = useState("");
  const [isRetrying, setIsRetrying] = useState(false);
   const { bookingId } = useParams(); // 👈 get param
  const [isPaused, setIsPaused] = useState(() => {
    return localStorage.getItem(`is_paused_${bookingId}`) === "true";
  });



    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
      const stored = localStorage.getItem("isSidebarOpen");
      return stored !== null ? JSON.parse(stored) : true;
    });



  
   
  
  
    /* ================= SAVE ACTIVE TAB ================= */
  
    /* ================= SIDEBAR WATCHER ================= */
  
    useEffect(() => {
      const interval = setInterval(() => {
        const stored = localStorage.getItem("isSidebarOpen");
        const parsed = stored !== null ? JSON.parse(stored) : true;
  
        if (parsed !== isSidebarOpen) {
          setIsSidebarOpen(parsed);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [isSidebarOpen]);
  

  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);

  const fileInputRef = useRef(null);
//  const bookingId=useParams()
//  console.log("BOOKING",bookingId?.bookingId)
  /* ===== Helper Function ===== */

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const formatValue = (value, fallback = "N/A") => {
    if (value === null || value === undefined || value === "") return fallback;
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value;
  };

  const formatList = (list, fallback = "N/A") => {
    if (!Array.isArray(list) || list.length === 0) return fallback;
    return list.join(", ");
  };

  const formatDateOnly = (value, fallback = "N/A") => {
    if (value === null || value === undefined || value === "") return fallback;

    const formatDateParts = (date) => {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear());
      return `${day}/${month}/${year}`;
    };

    if (typeof value === "string") {
      const trimmed = value.trim().replace(/,+$/, "");
      if (trimmed.includes("T")) return trimmed.split("T")[0];
      if (/\d{1,2}:\d{2}/.test(trimmed)) return trimmed.split(" ")[0];
      if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        const [y, m, d] = trimmed.split("-");
        return `${d}/${m}/${y}`;
      }
      if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
        const [d, m, y] = trimmed.split("-");
        return `${d}/${m}/${y}`;
      }
      if (/^\d{4}\/\d{2}\/\d{2}$/.test(trimmed)) {
        const [y, m, d] = trimmed.split("/");
        return `${d}/${m}/${y}`;
      }
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) return trimmed;
      const parsed = new Date(trimmed);
      const formatted = formatDateParts(parsed);
      return formatted || trimmed;
    }
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return formatDateParts(value);
    }
    if (typeof value === "number") {
      const parsed = new Date(value);
      const formatted = formatDateParts(parsed);
      if (formatted) return formatted;
    }
    return String(value);
  };

  const getPhotographerName = () => {
    if (!bookingData?.photographer_id) return "N/A";
    if (typeof bookingData.photographer_id === "string") {
      return bookingData.photographer_id;
    }
    return (
      bookingData.photographer_id.fullName ||
      bookingData.photographer_id.username ||
      "N/A"
    );
  };



  //  const handleBack = () => {
  //     if (uploading) {
  //       toast.warning("Upload in progress. Please pause or cancel before going back.");
  //       return;
  //     }
  //     navigate(-1);
  //   };
  
    // Sync states to local storage
    useEffect(() => {
      localStorage.setItem(`is_uploading_${bookingId}`, uploading.toString());
    }, [uploading, bookingId]);
  
    useEffect(() => {
      localStorage.setItem(`is_paused_${bookingId}`, isPaused.toString());
      pauseRef.current = isPaused;
    }, [isPaused, bookingId]);
  
    // Helper to check pause state from storage
    const isCurrentlyPaused = useCallback(() => {
      return localStorage.getItem(`is_paused_${bookingId}`) === "true" || isPaused;
    }, [bookingId, isPaused]);
  
    // Internet connectivity handlers
    useEffect(() => {
      const handleOffline = () => {
        setIsPaused(true);
        setStatusText("Internet Disconnected! Upload Paused.");
        toast.error("Lost Internet Connection! Upload Paused.", {
          toastId: "offline-toast"
        });
      };
  
      const handleOnline = () => {
        toast.dismiss("offline-toast");
        setStatusText("Internet Restored!");
        // Briefly show the restoration before the loop resumes or status changes
        setTimeout(() => {
            if (navigator.onLine && !isCurrentlyPaused()) {
              // It will be updated by the next step in the loop anyway
            }
        }, 2000);
      };
  
      window.addEventListener("offline", handleOffline);
      window.addEventListener("online", handleOnline);
  
      return () => {
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("online", handleOnline);
      };
    }, [isCurrentlyPaused]);
  
    // Sync UI with background/storage progress (optional but helps on remount)
    useEffect(() => {
      if (uploading) {
        const interval = setInterval(() => {
          const savedProgress = localStorage.getItem(`upload_progress_${bookingId}`);
          if (savedProgress) {
            const val = parseInt(savedProgress);
            setUploadProgress(prev => (val > prev) ? val : prev);
          }
          
          const isPausedStorage = localStorage.getItem(`is_paused_${bookingId}`) === "true";
          if (isPausedStorage !== isPaused) {
            setIsPaused(isPausedStorage);
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [uploading, bookingId, isPaused]);
  
  /* ================= FETCH BOOKING ================= */

  useEffect(() => {
    const fetchBookingById = async () => {
      try {
        setLoading(true);

        const res = await getAcceptedBookingById(booking?.shootId || bookingId?.bookingId);

        if (res?.data?.success) {
          setBookingData(res?.data?.data?.booking);
        }
      } catch {
        toast.error("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    if (booking?.shootId || bookingId?.bookingId) fetchBookingById();
  }, [booking?.shootId,bookingId?.bookingId]);

  /* ================= FILE SELECT ================= */

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files));
  };

  /* ================= UPLOAD FUNCTION ================= */

  // const handleUpload = async (selectedFiles) => {
  //   try {
  //     setUploading(true);
  //     setUploadProgress(0);

  //     let totalPartsAllFiles = 0;
  //     let uploadedParts = 0;

  //     const CHUNK_SIZE = 50 * 1024 * 1024;

  //     selectedFiles.forEach((file) => {
  //       totalPartsAllFiles += Math.ceil(file.size / CHUNK_SIZE);
  //     });

  //     for (const file of selectedFiles) {

  //       const startRes = await startUploadAPI({
  //       fileName: file.name,
  //       fileType: file.type,
  //       relativePath: file.webkitRelativePath || file.name,
  //       veroaBookingId: bookingData.veroaBookingId,
  //       fileSize: file.size,
  //     });

  //       const { key, uploadId } = startRes.data;

  //       const totalParts = Math.ceil(file.size / CHUNK_SIZE);

  //       let parts = [];

  //       for (let partNumber = 1; partNumber <= totalParts; partNumber++) {

  //         const start = (partNumber - 1) * CHUNK_SIZE;
  //         const end = Math.min(start + CHUNK_SIZE, file.size);

  //         const chunkFile = file.slice(start, end);

  //         const formData = new FormData();
  //         formData.append("key", key);
  //         formData.append("uploadId", uploadId);
  //         formData.append("partNumber", partNumber.toString());
  //         formData.append("chunk", chunkFile);

  //         const chunkRes = await getPartUploadUrlAPI(formData);

  //         parts.push({
  //           ETag: chunkRes.data?.ETag || chunkRes.data?.data?.ETag,
  //           PartNumber: partNumber,
  //         });

  //         uploadedParts++;

  //         const percent = Math.round(
  //           (uploadedParts / totalPartsAllFiles) * 100
  //         );

  //         setUploadProgress(percent);
  //       }

  //       await completeUploadAPI({
  //         key,
  //         uploadId,
  //         parts,
  //         bookingid: bookingData._id,
  //         clientId: bookingData.client_id?._id,
  //         photographerId: bookingData.photographer_id,
  //         veroaBookingId: bookingData.bookingId,
  //       });
  //     }

  //     toast.success("Files uploaded successfully 🎉");

  //     setFiles([]);
  //     setUploadProgress(0);

  //   } catch {
  //     toast.error("Upload failed. Please try again.");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

/* ================= HELPERS ================= */

  const waitForConnectivity = async () => {
    while (!navigator.onLine || isCurrentlyPaused()) {
      if (cancelRef.current) break;
      if (!navigator.onLine) setIsRetrying(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setIsRetrying(false);
  };

  const applyProgress = (baseUploaded, loaded) => {
    const total = totalBytesRef.current;
    if (!total) return;
    const totalPercent = Math.round(((baseUploaded + loaded) / total) * 100);
    const capped = Math.min(totalPercent, 99);
    setUploadProgress(capped);
    localStorage.setItem(`upload_progress_${bookingId}`, capped.toString());
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel the entire upload?")) {
      cancelRef.current = true;
      setUploading(false);
      localStorage.removeItem(`is_uploading_${bookingId}`);
      localStorage.removeItem(`is_paused_${bookingId}`);
      localStorage.removeItem(`upload_progress_${bookingId}`);
      toast.info("Upload cancelled.");
    }
  };
   const handleUpload = async () => {
      try {
        setUploading(true);
        setUploadProgress(0);
        cancelRef.current = false;
        setIsPaused(false);
        setStatusText("Initializing...");
  
        const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB
        let totalSize = files.reduce((acc, file) => acc + file.size, 0);
        totalBytesRef.current = totalSize;
        
        let uploadedSize = 0;
        uploadedBytesRef.current = 0;
  
        for (const file of files) {
          if (cancelRef.current) break;
          
          const relativePath = file.webkitRelativePath || file.name;
          setStatusText(`Starting upload for ${file.name}...`);
  
          // Wait for net/pause before each file
          await waitForConnectivity();
          if (cancelRef.current) break;
  
          // 1. Start Upload (Get strategy)
          const startRes = await startUploadAPI({
            fileName: file.name,
            fileType: file.type,
            relativePath,
            veroaBookingId: bookingData.veroaBookingId,
            fileSize: file.size,
          });
  
  
          const { strategy, uploadId, key, uploadUrl } = startRes.data;
  
          if (strategy === "single") {
            // Wait for net/pause
            await waitForConnectivity();
            if (cancelRef.current) break;
  
            setStatusText(`Uploading ${file.name}...`);
            
            const baseUploaded = uploadedBytesRef.current;
            await axios.put(uploadUrl, file, {
              headers: { "Content-Type": file.type },
              onUploadProgress: (progressEvent) => {
                applyProgress(baseUploaded, progressEvent.loaded);
              },
            });
  
            uploadedSize += file.size;
            uploadedBytesRef.current = uploadedSize;
  
            // Complete the upload
            await completeUploadAPI({
              key,
              uploadId: null,
              parts: [],
              bookingid: bookingId,
              clientId: bookingData.client_id?._id,
              photographerId: bookingData.photographer_id?._id,
              veroaBookingId: bookingData.veroaBookingId,
            });
  
          } else {
            // Multipart logic
            const totalParts = Math.ceil(file.size / CHUNK_SIZE);
            let parts = [];
  
            for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
              // Check connectivity and pause before each chunk
              await waitForConnectivity();
              if (cancelRef.current) break;
  
              setStatusText(`Uploading ${file.name} (Part ${partNumber}/${totalParts})...`);
              
              const start = (partNumber - 1) * CHUNK_SIZE;
              const end = Math.min(start + CHUNK_SIZE, file.size);
              const chunkFile = file.slice(start, end);
  
              // Get presigned URL for this part
              const partUrlRes = await getPartUploadUrlAPI({
                key,
                uploadId,
                partNumber: partNumber.toString(),
              });
  
              const { uploadUrl: partUploadUrl } = partUrlRes.data;
  
              // Upload the chunk to S3
              const baseUploaded = uploadedBytesRef.current;
              const uploadRes = await axios.put(partUploadUrl, chunkFile, {
                headers: { "Content-Type": file.type },
                onUploadProgress: (progressEvent) => {
                  applyProgress(baseUploaded, progressEvent.loaded);
                },
              });
  
              const etag = uploadRes.headers.etag;
              parts.push({
                ETag: etag.replace(/"/g, ""), 
                PartNumber: partNumber,
              });
  
              uploadedSize += chunkFile.size;
              uploadedBytesRef.current = uploadedSize;
            }
  
            if (cancelRef.current) break;
  
            // Complete the multipart upload
            await completeUploadAPI({
              key,
              uploadId,
              parts,
              bookingid: bookingId,
              clientId: bookingData.client_id?._id,
              photographerId: bookingData.photographer_id?._id,
              veroaBookingId: bookingData.veroaBookingId,
            });
          }
        }
  
        if (!cancelRef.current) {
          toast.success("Files uploaded successfully 🎉");
          setFiles([]);
          setUploadProgress(100);
          setUploading(false);
          localStorage.removeItem(`is_uploading_${bookingId}`);
          localStorage.removeItem(`upload_progress_${bookingId}`);
          localStorage.removeItem(`is_paused_${bookingId}`);
        }
  
      } catch (error) {
        console.error("Upload error:", error);
        if (axios.isCancel(error)) {
          toast.info("Upload cancelled.");
        } else {
          const isNetworkError = !navigator.onLine || error.code === 'ERR_NETWORK';
          if (!isNetworkError) {
            toast.error("Upload failed: " + (error.response?.data?.error || "Please try again."));
          }
          setIsPaused(true); 
        }
      } finally {
        if (!cancelRef.current && !pauseRef.current) {
           // Optionally reset if not paused
        }
      }
    };

  /* ================= LOADER ================= */

   /* ================= LOADER HANDLING ================= */
  
    if (uploading) {
      return (
        <div style={{ position: 'relative' }}>
          <Loader2 
            percentage={uploadProgress} 
            isPaused={isPaused} 
            statusText={statusText || (isRetrying ? "Reconnecting..." : (isPaused ? "Paused" : "Uploading..."))} 
          />
          <div style={{
            position: 'fixed',
            top: '65%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            display: 'flex',
            gap: '10px'
          }}>
            <button 
              className="upload-btn" 
              style={{ 
                background: isPaused ? "#28a745" : "#ffc107", 
                color: "#fff",
                minWidth: "120px" 
              }}
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button 
              className="upload-btn" 
              style={{ 
                background: "#dc3545", 
                color: "#fff",
                minWidth: "120px" 
              }}
              onClick={handleCancel}
            >
              ✖ Cancel
            </button>
          </div>
        </div>
      );
    }

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
    <div className={`details-container ${isSidebarOpen ? "open" : "closed"}`}>
    {/* <div className="details-container"> */}

     

      <div className="details-header">
        <button onClick={onBack} className="back-btn">
          ← Back
        </button>

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

        <div className="section-title">Photographer Information</div>

        <div className="details-grid">
          <div>
            <label>Photographer Name</label>
            <p>{getPhotographerName()}</p>
          </div>

          <div>
            <label>Photographer Email</label>
            <p>{formatValue(bookingData.photographer_id?.username)}</p>
          </div>

          <div>
            <label>Photographer ID</label>
            <p>{formatValue(bookingData.photographer_id?._id)}</p>
          </div>

          <div>
            <label>Assigned Photographers</label>
            <p>{formatList(bookingData.photographerIds)}</p>
          </div>
        </div>

        <div className="section-title">Schedule</div>

        <div className="details-grid">
          <div>
            <label>Booking Date</label>
            <p>{formatDateOnly(bookingData.ist_bookingDate)}</p>
          </div>

          <div>
            <label>Event Date</label>
            <p>{formatDateOnly(bookingData.eventDate || bookingData.date)}</p>
          </div>

          <div>
            <label>From Date</label>
            <p>{formatDateOnly(bookingData.fromDate)}</p>
          </div>

          <div>
            <label>To Date</label>
            <p>{formatDateOnly(bookingData.toDate)}</p>
          </div>

          <div>
            <label>Accepted At</label>
            <p>{formatDateOnly(bookingData.acceptedAt)}</p>
          </div>
        </div>

        <div className="section-title">Venue & Address</div>

        <div className="details-grid">
          <div>
            <label>Venue</label>
            <p>{formatValue(bookingData.venue)}</p>
          </div>

          <div>
            <label>Flat / House No</label>
            <p>{formatValue(bookingData.flatOrHouseNo)}</p>
          </div>

          <div>
            <label>Street</label>
            <p>{formatValue(bookingData.streetName)}</p>
          </div>

          <div>
            <label>City</label>
            <p>{formatValue(bookingData.city)}</p>
          </div>

          <div>
            <label>State</label>
            <p>{formatValue(bookingData.state)}</p>
          </div>

          <div>
            <label>Postal Code</label>
            <p>{formatValue(bookingData.postalCode)}</p>
          </div>
        </div>

        <div className="section-title">Payment Details</div>

        <div className="details-grid">
          <div>
            <label>Photographer Amount</label>
            <p>{formatValue(bookingData.photographerAmount)}</p>
          </div>

          <div>
            <label>Payment Status</label>
            <p>{formatValue(bookingData.paymentStatus)}</p>
          </div>

          {!(String(bookingData.paymentStatus || "").toLowerCase().includes("full") ||
            bookingData.full_Payment ||
            bookingData.fullyPaidAt) && (
            <div>
              <label>Outstanding Amount</label>
              <p>{formatValue(bookingData.outStandingAmount)}</p>
            </div>
          )}

          <div>
            <label>Partial Payment</label>
            <p>{formatValue(bookingData.partial_Payment)}</p>
          </div>

          <div>
            <label>Full Payment</label>
            <p>{formatValue(bookingData.full_Payment)}</p>
          </div>

          <div>
            <label>Payment Mode</label>
            <p>{formatValue(bookingData.paymentMode)}</p>
          </div>

          <div>
            <label>Payment Date</label>
            <p>{formatDateOnly(bookingData.paymentDate)}</p>
          </div>

          <div>
            <label>Fully Paid At</label>
            <p>{formatDateOnly(bookingData.fullyPaidAt)}</p>
          </div>
        </div>

        <div className="section-title">Gallery & Uploads</div>

        <div className="details-grid">
          <div>
            <label>Gallery Status</label>
            <p>{formatValue(bookingData.galleryStatus)}</p>
          </div>

          <div>
            <label>First Photo Uploaded At</label>
            <p>{formatDateOnly(bookingData.firstPhotoUploadedAt)}</p>
          </div>

          <div>
            <label>Photos Uploaded At</label>
            <p>{formatDateOnly(bookingData.photosUploadedAt)}</p>
          </div>
        </div>

        {(bookingData.status === "canceled" ||
          bookingData.cancellationDate ||
          bookingData.cancellationReason ||
          bookingData.cancellationCharge) && (
          <>
            <div className="section-title">Cancellation Details</div>

            <div className="details-grid">
              <div>
                <label>Cancellation Date</label>
                <p>{formatDateOnly(bookingData.cancellationDate)}</p>
              </div>

              <div>
                <label>Cancellation Charge</label>
                <p>{formatValue(bookingData.cancellationCharge)}</p>
              </div>

              <div>
                <label>Cancellation Reason</label>
                <p>{formatValue(bookingData.cancellationReason)}</p>
              </div>
            </div>
          </>
        )}

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
    // </div>
  );
};

export default UpcomingBookingDetails;
