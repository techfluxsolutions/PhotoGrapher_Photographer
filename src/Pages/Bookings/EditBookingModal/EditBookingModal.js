// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
// import "./EditBookingModal.css";

// const EditBookingModal = ({ booking, isOpen, onClose, onSave }) => {
//   const [bookingStatus, setBookingStatus] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");

//   const BOOKING_STATUSES = [
//   "pending",
//   "confirmed",
//   "completed",
//   "canceled",
// ];



//   useEffect(() => {
//     if (booking) {
//       setBookingStatus(booking.status);
//       setPaymentStatus(booking.payment_status);
//     }
//   }, [booking]);

//   if (!booking) return null;

//   const handleSubmit = () => {
//     onSave({
//       ...booking,
//       status: bookingStatus,
//       payment_status: paymentStatus,
//     });
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="edit-booking-modal"
//       overlayClassName="modal-overlay"
//     >
//       <h3 className="modal-title">Edit Booking</h3>

//        {/* Booking Status */}
//       <div className="form-group">
//         <label>Booking Status</label>
//         <select
//           value={bookingStatus}
//           onChange={(e) => setBookingStatus(e.target.value)}
//         >
//           {BOOKING_STATUSES.map((status) => (
//             <option key={status} value={status}>
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="modal-actions">
//         <button className="btn-secondary" onClick={onClose}>
//           Cancel
//         </button>
//         <button className="btn-primary" onClick={handleSubmit}>
//           Save Changes
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default EditBookingModal;



import React, { useEffect, useState } from "react";
import Modal from "react-modal";
// import Loader from "../../Template/Loader/Loader";
import Loader from "../../../Loader/Loader";
import { toast } from "react-toastify";
import "./EditBookingModal.css";
import { updateBookingStatus } from "../../../utils/APIs/bookingsApis";

const EditBookingModal = ({ booking, isOpen, onClose, onSave }) => {
  const [bookingStatus, setBookingStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const BOOKING_STATUSES = [
    "pending",
    "confirmed",
    "completed",
    "canceled",
  ];

  useEffect(() => {
    if (booking) {
      setBookingStatus(booking.status);
      setNotes(booking.photography_requirements || "");
    }
  }, [booking]);

  if (!booking) return null;

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        status: bookingStatus,
        notes: notes,
      };

      const res = await updateBookingStatus(booking.shootId, payload);

      if (res?.data?.success) {
        toast.success(res.data.message || "Booking updated successfully");

        onSave(); // refresh table
        onClose();
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
    >
      {loading && <Loader />}

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

      {/* Notes */}
      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

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
