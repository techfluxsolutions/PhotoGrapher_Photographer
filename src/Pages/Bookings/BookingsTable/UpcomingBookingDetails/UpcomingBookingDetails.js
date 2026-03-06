import React, { useEffect, useState } from "react";
import "./UpcomingBookingDetails.css";
import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
import Loader from "../../../../Loader/Loader";

const UpcomingBookingDetails = ({ booking, onBack }) => {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // const fetchBookingById = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await getAcceptedBookingById(booking.shootId);

  //     if (res?.data?.success) {
  //       setBookingData(res.data.data.booking);
  //     }
  //   } catch (error) {
  //     console.error("Fetch booking by ID error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (booking?.shootId) {
  //     fetchBookingById();
  //   }
  // }, [booking]);


  useEffect(() => {
  const fetchBookingById = async () => {
    try {
      setLoading(true);

      const res = await getAcceptedBookingById(booking?.shootId);

      if (res?.data?.success) {
        setBookingData(res.data.data.booking);
      }
    } catch (error) {
      console.error("Fetch booking by ID error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (booking?.shootId) {
    fetchBookingById();
  }
}, [booking?.shootId]);

  /* ================= LOADER HANDLING ================= */

  if (loading) return <Loader />;

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
            <p>{bookingData.client_id?.username}</p>
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
            <p>{bookingData.service_id?.serviceName}</p>
          </div>
        </div>

        <div className="section-title">Event Details</div>

        <div className="details-grid">
          <div>
            <label>Event Type</label>
            <p>{bookingData.eventType}</p>
          </div>

          <div>
            <label>Date</label>
            <p>{bookingData.date}</p>
          </div>

          <div>
            <label>Time</label>
            <p>{bookingData.time}</p>
          </div>

          <div>
            <label>Location</label>
            <p>
              {bookingData.flatOrHouseNo}, {bookingData.streetName},{" "}
              {bookingData.city}, {bookingData.state} -{" "}
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
            <label>Payment Status : </label>
            <span className="status-badge">
              {bookingData.paymentStatus}
            </span>
          </div>

          <div>
            <label>Booking Status : </label>
            <span className="status-badge">
              {bookingData.bookingStatus}
            </span>
          </div>

          <div>
            <label>Current Status : </label>
            <span className="status-badge">
              {bookingData.status}
            </span>
          </div>
        </div>

        {bookingData.requirements && (
          <>
            <div className="section-title">Requirements</div>
            <div className="requirements-box">
              {bookingData.requirements}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpcomingBookingDetails;