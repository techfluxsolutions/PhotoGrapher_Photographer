import React, { useEffect, useState } from "react";
import "./RequirementModal.css";
import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
import Loader from "../../../../Template/Loader/Loader";

const RequirementModal = ({ isOpen, onClose, bookingId }) => {
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const res = await getAcceptedBookingById(bookingId);

      if (res?.data?.success) {
        setRequirements(res.data.data.booking.requirements);
      }
    } catch (error) {
      console.error("Requirement fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && bookingId) {
      fetchBookingDetails();
    }
  }, [isOpen, bookingId]);

  if (!isOpen) return null;

  return (
    <div className="requirement-modal-overlay">
      <div className="requirement-modal">

        <div className="modal-header">
          <h3>Client Requirements</h3>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="requirement-content">
            {requirements || "No requirements provided."}
          </div>
        )}

      </div>
    </div>
  );
};

export default RequirementModal;