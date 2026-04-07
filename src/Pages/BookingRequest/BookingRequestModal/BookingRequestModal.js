import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "../../Bookings/EditBookingModal/EditBookingModal.css";
import { acceptBookingRequest } from "../../../utils/APIs/bookingsApis";
import Loader from "../../../Template/Loader/Loader";

const BookingRequestModal = ({ booking, isOpen, onClose, onSave }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const REQUEST_STATUSES = [
    { label: "Accept", value: "accepted" },
    { label: "Reject", value: "rejected" },
  ];

  useEffect(() => {
    if (booking) {
      setStatus("");
    }
  }, [booking]);

  if (!booking) return null;

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!status) {
      toast.error("Please select status");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        bookingStatus: status, // accepted | rejected
      };

      const res = await acceptBookingRequest(booking.shootId, payload);

      if (res?.data?.success) {
        toast.success(res.data.message || "Booking updated successfully");

        onSave();   // refresh table
        onClose();  // close modal
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update booking"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="edit-booking-modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      {loading && <Loader />}

      <h3 className="modal-title">Booking Request</h3>

      <div className="form-group">
        <label>Request Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select</option>
          {REQUEST_STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="modal-actions">
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>

        <button className="btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default BookingRequestModal;