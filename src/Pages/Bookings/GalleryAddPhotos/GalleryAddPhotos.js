import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./GalleryAddPhotos.css";
import { getAcceptedBookingById } from "../../../utils/APIs/bookingsApis";
import Loader from "../../../Loader/Loader";

const GalleryAddPhotos = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  /* ================= FETCH BOOKING BY ID ================= */

  // const fetchBookingById = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getAcceptedBookingById(bookingId);

  //     if (res?.data?.success) {
  //       setBookingData(res.data.data.booking);
  //     }
  //   } catch (error) {
  //     console.error("Fetch booking error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (bookingId) {
  //     fetchBookingById();
  //   }
  // }, [bookingId]);

  useEffect(() => {
  const fetchBookingById = async () => {
    try {
      setLoading(true);
      const res = await getAcceptedBookingById(bookingId);

      if (res?.data?.success) {
        setBookingData(res.data.data.booking);
      }
    } catch (error) {
      console.error("Fetch booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (bookingId) {
    fetchBookingById();
  }
}, [bookingId]);
  /* ================= LOADER ================= */

  if (loading) return <Loader />;

  if (!bookingData) {
    return (
      <div className="gallery-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="gallery-container">

      <div className="gallery-header">
        <button onClick={handleBack} className="back-btn">
          ← Back
        </button>
      </div>

      {/* EVENT TYPE */}
      <h2>{bookingData.eventType}</h2>

      {/* CLIENT NAME */}
      <p className="client-name">
        {bookingData.client_id?.username}
      </p>

      {/* EVENT DETAILS */}
      <p>
        Event Location - {bookingData.city}, {bookingData.state}
      </p>

      <p>
        Event Date - {bookingData.date}
      </p>

      <p>
        Event Time - {bookingData.time}
      </p>

      {/* UPLOAD SECTION */}
      <div className="upload-box">
        <p>Drag and Drop photos here</p>
        <span>OR </span>
        <button className="upload-btn">
          Upload to Cloud
        </button>
      </div>
    </div>
  );
};

export default GalleryAddPhotos;