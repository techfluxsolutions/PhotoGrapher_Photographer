import "./CancelBookingModal.css";

const CancelBookingModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="cancel-modal-overlay">
      <div className="cancel-modal">

        <h3 className="cancel-title">
          Are you sure you want to cancel this booking?
        </h3>

        <div className="cancel-actions">

          <button
            className="cancel-no-btn"
            onClick={onClose}
            disabled={loading}
          >
            No
          </button>

          <button
            className="cancel-yes-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Yes, Cancel"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default CancelBookingModal;