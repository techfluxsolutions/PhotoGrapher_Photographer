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
import { useEffect, useState } from "react";
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

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleBack = () => navigate(-1);

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

  /* ================= FILE SELECT ================= */

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files));
  };

  /* ================= FILE UPLOAD ================= */

  const handleSubmitUpload = async () => {
    try {
      setUploading(true);
      setUploadProgress(0);

      const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB
      let totalSizeAllFiles = files.reduce((acc, file) => acc + file.size, 0);
      let uploadedSize = 0;

      for (const file of files) {
        const relativePath = file.webkitRelativePath || file.name;

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
          // Strategy: Single PUT upload for files < 100MB
          console.log(`Uploading ${file.name} using single strategy...`);
          
          await axios.put(uploadUrl, file, {
            headers: { "Content-Type": file.type },
            onUploadProgress: (progressEvent) => {
              const filePercent = (progressEvent.loaded / progressEvent.total) * file.size;
              const totalPercent = Math.round(((uploadedSize + filePercent) / totalSizeAllFiles) * 100);
              setUploadProgress(totalPercent);
            },
          });

          uploadedSize += file.size;

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
          // Strategy: Multipart Upload for files >= 100MB
          console.log(`Uploading ${file.name} using multipart strategy...`);
          
          const totalParts = Math.ceil(file.size / CHUNK_SIZE);
          let parts = [];

          for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
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
            const uploadRes = await axios.put(partUploadUrl, chunkFile, {
              headers: { "Content-Type": file.type },
              onUploadProgress: (progressEvent) => {
                const chunkUploaded = (progressEvent.loaded / progressEvent.total) * chunkFile.size;
                const totalPercent = Math.round(((uploadedSize + chunkUploaded) / totalSizeAllFiles) * 100);
                setUploadProgress(totalPercent);
              },
            });

            // S3 returns ETag in headers
            const etag = uploadRes.headers.etag;
            
            parts.push({
              ETag: etag.replace(/"/g, ""), // S3 ETags are quoted
              PartNumber: partNumber,
            });

            uploadedSize += chunkFile.size;
          }

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

      toast.success("Files uploaded successfully 🎉");
      setFiles([]);
      setUploadProgress(0);

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed: " + (error.response?.data?.error || "Please try again."));
    } finally {
      setUploading(false);
    }
  };

  /* ================= LOADER HANDLING ================= */

  if (loading) return <Loader />;
  if (uploading) return <Loader2 percentage={uploadProgress} />;
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
              accept="image/,video/"
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
