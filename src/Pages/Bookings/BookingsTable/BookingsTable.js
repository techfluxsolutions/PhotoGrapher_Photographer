import React, { useState } from "react";
import "./BookingsTable.css";
import { useNavigate } from "react-router-dom";
import { useChatData } from "../../../Context/chatDataContext";
import EditBookingModal from "../EditBookingModal/EditBookingModal";
import { FiEdit } from "react-icons/fi";


const BookingsTable = ({ data, page, limit }) => {

  
const dummyData = [
  {
    shootId: 1,
    shoot_id: "BK-1001",
    client_id: "CL-01",
    client_name: "Rahul Sharma",
    shoot_type: "Wedding",
    event_date: "2026-02-10",
    event_location: "Delhi",
    booking_amount: 50000,
    payment_mode: "UPI",
    payment_type: "Advance",
    status: "Confirmed",
    payment_status: "Paid",
    assigned_photographer: "Amit",
    team_studio: "Dream Studio",
    notes: "Evening event",
  },
  {
    shootId: 2,
    shoot_id: "BK-1002",
    client_id: "CL-02",
    client_name: "Priya Verma",
    shoot_type: "Pre-Wedding",
    event_date: "2026-03-05",
    event_location: "Jaipur",
    booking_amount: 30000,
    payment_mode: "Cash",
    payment_type: "Full",
    status: "Pending",
    payment_status: "Unpaid",
    assigned_photographer: "Rohit",
    team_studio: "Lens Craft",
    notes: "",
  },
];
  const navigate = useNavigate();
  const { setBooking } = useChatData();

const handleChatClick = (booking) => {
  setBooking(booking);
  console.log("shootId",booking.shoot_id)
  navigate(`/chat/booking/${booking.shoot_id}`);
};
const [dummyStateData, setDummyStateData] = useState(dummyData);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedBooking, setSelectedBooking] = useState(null);

const handleEditClick = (booking) => {
  setSelectedBooking(booking);
  setShowEditModal(true);
};

const handleUpdateBooking = (updatedBooking) => {
  setDummyStateData((prev) =>
    prev.map((item) =>
      item.shootId === updatedBooking.shootId ? updatedBooking : item
    )
  );
  setShowEditModal(false);
};







  return (
    <div className="table-wrapper">
      {/* <table className="bookings-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Shoot ID</th>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Assigned Photographer</th>
            <th>Team / Studio</th>
            <th>Shoot Type</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Chat</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="10" className="no-data">
                No bookings found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.shootId}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{item.shoot_id || "-"}</td>
                <td>{item.client_id || "-"}</td>
                <td>{item.client_name || "-"}</td>
                <td>{item.assigned_photographer || "-"}</td>
                <td>{item.team_studio || "-"}</td>
                <td>{item.shoot_type || "-"}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.notes || "-"}</td>
                <td>
                  <span
                    className="chat-btn"
                    onClick={() => handleChatClick(item)}
                  >
                    💬
                  </span>
                </td>

               
              </tr>
            ))
          )}
        </tbody>
      </table> */}

       <table className="bookings-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Booking ID</th>
            <th>Client Name</th>
            <th>Event Type</th>
            <th>Event Date</th>
            <th>Event Location</th>
            <th>Booking Amount</th>
            <th>Payment Mode</th>
             <th>Payment Type</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Assigned Photographer</th>
            <th>Team / Studio</th>
            <th>Chat</th>
            <th>Action</th>

          </tr>
        </thead>

        <tbody>
  {data.length === 0 ? (
    <tr>
      <td colSpan="15" className="no-data">
        No bookings found
      </td>
    </tr>
  ) : (
    data.map((item, index) => (
      <tr key={item.shootId}>
        {/* Sr */}
        <td>{(page - 1) * limit + index + 1}</td>

        {/* Booking ID */}
        <td>{item.shoot_id || "-"}</td>

        {/* Client Name */}
        <td>{item.client_name || "-"}</td>

        {/* Event Type */}
        <td>{item.shoot_type || "-"}</td>

        {/* Event Date */}
        <td>{item.event_date || "-"}</td>

        {/* Event Location */}
        <td>{item.event_location || "-"}</td>

        {/* Booking Amount */}
        <td>₹ {item.booking_amount || "-"}</td>

        {/* Payment Mode */}
        <td>{item.payment_mode || "-"}</td>

        {/* Payment Type */}
        <td>{item.payment_type || "-"}</td>

        {/* Booking Status */}
        <td>
          <span className={`status ${item.status}`}>
            {item.status}
          </span>
        </td>

        {/* Payment Status */}
        <td>
          <span className={`status ${item.payment_status}`}>
            {item.payment_status}
          </span>
        </td>

        {/* Assigned Photographer */}
        <td>{item.assigned_photographer || "-"}</td>

        {/* Team / Studio */}
        <td>{item.team_studio || "-"}</td>

        {/* Chat */}
        <td>
          <span
            className="chat-btn"
            onClick={() => handleChatClick(item)}
          >
            💬
          </span>
        </td>

        {/* Action */}
        <td>
  <button
    className="chat-btn"
    onClick={() => handleEditClick(item)}
    title="Edit Booking"
  >
    <FiEdit size={16} />
  </button>
</td>

      </tr>
    ))
  )}
</tbody>

      </table>
    <EditBookingModal
  booking={selectedBooking}
  isOpen={showEditModal}
  onClose={() => setShowEditModal(false)}
  onSave={handleUpdateBooking}
/>


    </div>
  );
};

export default BookingsTable;
