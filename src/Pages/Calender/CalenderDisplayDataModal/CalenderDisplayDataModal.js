import React from "react";
import "./CalenderDisplayDataModal.css";

const CalenderDisplayDataModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

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
          <strong>{data.date}</strong> {/* ✅ Direct from API */}
        </div>

        <div className="modal-row">
          <span>Time:</span>
          <strong>{data.time}</strong> {/* ✅ Direct from API */}
        </div>

        <div className="modal-row">
          <span>City:</span>
          <strong>{data.city}</strong>
        </div>

        <div className="modal-row">
          <span>Client Name:</span>
          <strong>{data.clientName}</strong>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CalenderDisplayDataModal;