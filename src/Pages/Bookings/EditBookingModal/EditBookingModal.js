import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./EditBookingModal.css";

const EditBookingModal = ({ booking, isOpen, onClose, onSave }) => {
  const [bookingStatus, setBookingStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "canceled",
];

// const PAYMENT_STATUSES = [
//   "pending",
//   "paid",
//   "partially paid",
//   "fully paid",
// ];


  useEffect(() => {
    if (booking) {
      setBookingStatus(booking.status);
      setPaymentStatus(booking.payment_status);
    }
  }, [booking]);

  if (!booking) return null;

  const handleSubmit = () => {
    onSave({
      ...booking,
      status: bookingStatus,
      payment_status: paymentStatus,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="edit-booking-modal"
      overlayClassName="modal-overlay"
    >
      <h3 className="modal-title">Edit Booking</h3>

       {/* Booking Status */}
      <div className="form-group">
        <label>Booking Status</label>
        <select
          value={bookingStatus}
          onChange={(e) => setBookingStatus(e.target.value)}
        >
          {BOOKING_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="form-group">
        <label>Payment Status</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          {PAYMENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div> */}


      <div className="modal-actions">
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-primary" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditBookingModal;
