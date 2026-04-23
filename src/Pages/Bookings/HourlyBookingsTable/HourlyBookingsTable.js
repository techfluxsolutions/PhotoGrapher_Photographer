import React from "react";
import "../BookingsTable/BookingsTable.css";

const HourlyBookingsTable = () => {
  return (
    <div className="table-wrapper">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Booking ID</th>
            <th>Client Name</th>
            {/* <th>Email</th>
              <th>Mobile</th> */}
            <th>Event Type</th>
            <th>Date</th>
            {/* <th>Time</th> */}
            <th>City</th>
            <th>Budget</th>
            <th>View Details</th>
            <th>Gallery</th>
            <th>Days Left</th>
            <th>Booking Status</th>
            <th>Gallery Status</th>
            <th>Edit Status</th>
            <th>Cancel Booking</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan="14" style={{ textAlign: "center", padding: "20px" }}>
              No hourly shoot bookings found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HourlyBookingsTable;
