import React, { useState } from "react";
import "./AddBookingModal.css";

const AddBookingModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    client_name: "",
    shoot_type: "",
    event_date: "",
    event_location: "",
    booking_amount: "",
    booking_status: "pending",
    payment_status: "pending",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      shootId: Date.now(), // dummy id
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-booking-modal">
        <h3 className="modal-title">Add Booking</h3>

        <div className="form-group">
          <label>Client Name</label>
          <input
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            placeholder="Enter client name"
          />
        </div>

        <div className="form-group">
          <label>Event Type</label>
          <input
            name="shoot_type"
            value={formData.shoot_type}
            onChange={handleChange}
            placeholder="Wedding / Pre-wedding"
          />
        </div>

        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="event_location"
            value={formData.event_location}
            onChange={handleChange}
            placeholder="Event location"
          />
        </div>

        <div className="form-group">
          <label>Booking Amount</label>
          <input
            type="number"
            name="booking_amount"
            value={formData.booking_amount}
            onChange={handleChange}
            placeholder="₹ Amount"
          />
        </div>

        <div className="form-group">
          <label>Booking Status</label>
          <select
            name="booking_status"
            value={formData.booking_status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="form-group">
          <label>Payment Status</label>
          <select
            name="payment_status"
            value={formData.payment_status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="partially paid">Partially Paid</option>
            <option value="fully paid">Fully Paid</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Add Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookingModal;
