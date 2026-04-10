import React, { useEffect, useState } from "react";
import "./RequirementModal.css";
import { getAcceptedBookingById } from "../../../../utils/APIs/bookingsApis";
import Loader from "../../../../Template/Loader/Loader";

const RequirementModal = ({ isOpen, onClose, bookingId }) => {
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  // const fetchBookingDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getAcceptedBookingById(bookingId);

  //     if (res?.data?.success) {
  //       setRequirements(res.data.data.booking.requirements);
  //     }
  //   } catch (error) {
  //     console.error("Requirement fetch error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isOpen && bookingId) {
  //     fetchBookingDetails();
  //   }
  // }, [isOpen, bookingId]);

  useEffect(() => {
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
            {requirements ? (
              <ul className="requirement-list">

                {(Array.isArray(requirements)
                  ? requirements
                  : typeof requirements === "string"
                    ? requirements.includes(",")
                      ? requirements.split(",")
                      : requirements.split(/(?=[A-Z])/)
                    : []
                ).map((req, index) => (

                  <li key={index}>
                    {req?.trim?.() || req}
                  </li>

                ))}

              </ul>
            ) : (
              "No requirements provided."
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default RequirementModal;