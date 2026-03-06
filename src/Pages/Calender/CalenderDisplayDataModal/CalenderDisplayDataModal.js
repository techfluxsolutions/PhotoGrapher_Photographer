import React from "react";
import { useNavigate } from "react-router-dom";
import "./CalenderDisplayDataModal.css";

const CalenderDisplayDataModal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();

  if (!isOpen || !data) return null;

  const handleGoToBooking = () => {
    onClose();              // close modal first
    navigate("/bookings");  // navigate
  };

  return (
    <div className="calendar-modal-overlay">
      <div className="calendar-modal">
        <h3 className="modal-title">Booking Details</h3>

        <div className="modal-row">
          <span>Event Type:</span>
          <strong>{data.eventType}</strong>
        </div>

        <div className="modal-row">
          <span>Date:</span>
          <strong>{data.date}</strong>
        </div>

        {/* <div className="modal-row">
          <span>Time:</span>
          <strong>{data.time}</strong>
        </div> */}

        <div className="modal-row">
          <span>City:</span>
          <strong>{data.city}</strong>
        </div>

        <div className="modal-row">
          <span>Client Name:</span>
          <strong>{data.clientName}</strong>
        </div>

        {/* ✅ Buttons */}
        <div className="modal-actions">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>

          <button className="go-booking-btn" onClick={handleGoToBooking}>
            Take me to this booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalenderDisplayDataModal;