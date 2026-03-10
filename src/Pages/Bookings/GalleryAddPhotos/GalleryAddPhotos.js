// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./GalleryAddPhotos.css";
// import { getAcceptedBookingById } from "../../../utils/APIs/bookingsApis";
// import Loader from "../../../Loader/Loader";

// const GalleryAddPhotos = () => {
//   const navigate = useNavigate();
//   const { bookingId } = useParams();

//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   /* ================= FETCH BOOKING BY ID ================= */

//   // const fetchBookingById = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const res = await getAcceptedBookingById(bookingId);

//   //     if (res?.data?.success) {
//   //       setBookingData(res.data.data.booking);
//   //     }
//   //   } catch (error) {
//   //     console.error("Fetch booking error:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (bookingId) {
//   //     fetchBookingById();
//   //   }
//   // }, [bookingId]);

//   useEffect(() => {
//   const fetchBookingById = async () => {
//     try {
//       setLoading(true);
//       const res = await getAcceptedBookingById(bookingId);

//       if (res?.data?.success) {
//         setBookingData(res.data.data.booking);
//       }
//     } catch (error) {
//       console.error("Fetch booking error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (bookingId) {
//     fetchBookingById();
//   }
// }, [bookingId]);
//   /* ================= LOADER ================= */

//   if (loading) return <Loader />;

//   if (!bookingData) {
//     return (
//       <div className="gallery-container">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="gallery-container">

//       <div className="gallery-header">
//         <button onClick={handleBack} className="back-btn">
//           ← Back
//         </button>
//       </div>

//       {/* EVENT TYPE */}
//       <h2>{bookingData.eventType}</h2>

//       {/* CLIENT NAME */}
//       <p className="client-name">
//         {bookingData.client_id?.username}
//       </p>

//       {/* EVENT DETAILS */}
//       <p>
//         Event Location - {bookingData.city}, {bookingData.state}
//       </p>

//       <p>
//         Event Date - {bookingData.date}
//       </p>

//       <p>
//         Event Time - {bookingData.time}
//       </p>

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

// export default GalleryAddPhotos;




import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./GalleryAddPhotos.css";
import { getAcceptedBookingById } from "../../../utils/APIs/bookingsApis";
import {
  startGalleryUpload,
  uploadGalleryChunk,
  completeGalleryUpload,
} from "../../../utils/APIs/gallaryUploadApis";
import Loader from "../../../Loader/Loader";
import Loader2 from "../../../Template/Loader/Loader2";
import { toast } from "react-toastify";

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

      let totalPartsAllFiles = 0;
      let uploadedParts = 0;

      const CHUNK_SIZE = 50 * 1024 * 1024;

      files.forEach((file) => {
        totalPartsAllFiles += Math.ceil(file.size / CHUNK_SIZE);
      });

      for (const file of files) {

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
          bookingid: bookingId,
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