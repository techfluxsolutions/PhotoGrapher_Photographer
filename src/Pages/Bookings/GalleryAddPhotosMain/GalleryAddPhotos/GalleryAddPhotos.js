// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./GalleryAddPhotos.css";
// import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
// import {startGalleryUpload, uploadGalleryChunk, completeGalleryUpload,} from "../../../../utils/APIs/gallaryUploadApis";
// import { toast } from "react-toastify";
// import { FaEye } from "react-icons/fa";
// import Loader from "../../../../Template/Loader/Loader";
// import Loader2 from "../../../../Template/Loader2/Loader2";

// const GalleryAddPhotos = () => {
//   const navigate = useNavigate();
//   const { bookingId } = useParams();

//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState([]);

//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleBack = () => navigate(-1);

//   /* ================= FETCH BOOKING ================= */

//   useEffect(() => {
//     const fetchBookingById = async () => {
//       try {
//         setLoading(true);

//         const res = await getAcceptedBookingById(bookingId);

//         if (res?.data?.success) {
//           setBookingData(res.data.data.booking);
//         }
//       } catch {
//         toast.error("Failed to fetch booking details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (bookingId) fetchBookingById();
//   }, [bookingId]);

//   /* ================= FILE SELECT ================= */

//   const handleFileSelect = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   /* ================= FILE UPLOAD ================= */

//   const handleSubmitUpload = async () => {
//     try {
//       setUploading(true);
//       setUploadProgress(0);

//       let totalPartsAllFiles = 0;
//       let uploadedParts = 0;

//       const CHUNK_SIZE = 50 * 1024 * 1024;

//       files.forEach((file) => {
//         totalPartsAllFiles += Math.ceil(file.size / CHUNK_SIZE);
//       });

     
//       for (const file of files) {
//          const relativePath = file.webkitRelativePath || file.name;

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
//           bookingid: bookingId,
//           clientId: bookingData.client_id?._id,
//           photographerId: bookingData.photographer_id,
//           veroaBookingId: bookingData.veroaBookingId,
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

//   /* ================= LOADER HANDLING ================= */

//   if (loading) return <Loader />;
//   if (uploading) return <Loader2 percentage={uploadProgress} />;
//   if (!bookingData) return <Loader />;

//   return (
//     <div className="gallery-container">

//       <div className="gallery-header">
//   <button onClick={handleBack} className="back-btn">
//     ← Back
//   </button>

//   <button
//   className="back-btn"
//   onClick={() =>
//     navigate(
//       `/gallery/${bookingId}/${bookingData.photographer_id?._id}/${bookingData.client_id?._id}`
//     )
//   }
// >
//   <FaEye style={{ marginRight: "6px" }} />
//   View Gallery
// </button>
// </div>

//       <h2>{bookingData.eventType}</h2>

//       <p className="client-name">
//         {bookingData.client_id?.username}
//       </p>

//       <p>
//         Event Location - {bookingData.city}, {bookingData.state}
//       </p>

//       <p>
//         Event Date - {bookingData.date}
//       </p>

//       <p>
//         Event Time - {bookingData.time}
//       </p>

//       <div className="upload-box">

//         <p>Drag and Drop photos here</p>

//         <span>OR</span>

//        <label className="upload-btn">

//             Select Files

//             <input
//               type="file"
//               hidden
//               multiple
//               accept="image/,video/"
//               onChange={handleFileSelect}
//             />

//           </label>

//           <label className="upload-btn">

//             Select Folder

//             <input
//               type="file"
//               hidden
//               multiple
//               webkitdirectory="true"
//               onChange={handleFileSelect}
//             />

//           </label>

//         {files.length > 0 && (
//           <button
//             className="upload-btn"
//             onClick={handleSubmitUpload}
//           >
//             Submit Upload ({files.length})
//           </button>
//         )}

//       </div>

//     </div>
//   );
// };

// export default GalleryAddPhotos;




import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../../Template/Loader/Loader";
import Loader2 from "../../../../Template/Loader2/Loader2";
import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
import { completeUploadAPI, startUploadAPI, getPartUploadUrlAPI } from "../../../../utils/APIs/gallaryUploadApis";
import "./GalleryAddPhotos.css";

const GalleryAddPhotos = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const [uploading, setUploading] = useState(() => {
    return localStorage.getItem(`is_uploading_${bookingId}`) === "true";
  });
  const [uploadProgress, setUploadProgress] = useState(() => {
    const saved = localStorage.getItem(`upload_progress_${bookingId}`);
    return saved ? parseInt(saved) : 0;
  });
  
  const [isPaused, setIsPaused] = useState(() => {
    return localStorage.getItem(`is_paused_${bookingId}`) === "true";
  });
  const [statusText, setStatusText] = useState("");
  const [isRetrying, setIsRetrying] = useState(false);
  
  const pauseRef = useRef(false);
  const cancelRef = useRef(false);
  const uploadedBytesRef = useRef(0);
  const totalBytesRef = useRef(0);

  const handleBack = () => {
    if (uploading) {
      toast.warning("Upload in progress. Please pause or cancel before going back.");
      return;
    }
    navigate(-1);
  };

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

        const res = await getAcceptedBookingById(bookingId);

        if (res?.data?.success) {
          setBookingData(res.data.data.booking);
        }
      } catch {
        toast.error("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBookingById();
  }, [bookingId]);

  // Prevent page refresh during upload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (uploading) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [uploading]);

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

  /* ================= FILE SELECT ================= */

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files));

    console.log("Which files selected?",files)
  };

  /* ================= FILE UPLOAD ================= */

  const handleSubmitUpload = async () => {
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
  if (!bookingData) return <Loader />;

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <button onClick={handleBack} className="back-btn">
          ← Back
        </button>

        <button
          className="back-btn"
          onClick={() =>
            navigate(
              `/gallery/${bookingId}/${bookingData.photographer_id?._id}/${bookingData.client_id?._id}`
            )
          }
        >
          <FaEye style={{ marginRight: "6px" }} />
          View Gallery
        </button>
      </div>

      <h2>{bookingData.eventType}</h2>

      <p className="client-name">
        {bookingData.client_id?.username}
      </p>

      <p>
        Event Location - {bookingData.city}, {bookingData.state}
      </p>

      <p>
        Event Date - {bookingData.date}
      </p>

      <p>
        Event Time - {bookingData.time}
      </p>

      <div className="upload-box">

        <p>Drag and Drop photos here</p>

        <span>OR</span>

        <label className="upload-btn">

          Select Files

          <input
            type="file"
            hidden
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
          />
        </label>

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
            onClick={handleSubmitUpload}
          >
            Submit Upload ({files.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default GalleryAddPhotos;

