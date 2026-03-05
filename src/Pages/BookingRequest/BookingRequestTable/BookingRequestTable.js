import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./BookingRequestTable.css";
import { getPendingBookings } from "../../../utils/APIs/bookingsApis";
import Loader from "../../../Loader/Loader";
import BookingRequestModal from "../BookingRequestModal/BookingRequestModal";

const BookingRequestTable = ({ page: initialPage = 1, limit = 10 }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= FETCH BOOKINGS ================= */
  

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await getPendingBookings(page, limit);

      if (res?.data?.success) {
        const { bookings, meta } = res.data.data;

        const mappedData = bookings.map((item) => ({
          shootId: item._id,
          shoot_id: item.bookingId || "N/A",
          client_name: item.client_id?.username || "N/A",
          client_email: item.client_id?.email || "N/A",
          client_mobile: item.client_id?.mobileNumber || "N/A",
          shoot_type: item.eventType || "N/A",
          event_date: item.date || "N/A",
          event_time: item.time || "N/A",
          event_location: item.city || "N/A",
          photography_requirements: item.requirements || "N/A",
          bookingStatus: item.bookingStatus || "N/A", // ✅ ADDED
        }));

        setData(mappedData);
        setTotalPages(Math.ceil(meta.total / meta.limit));
      }
    } catch (error) {
      console.error("Bookings fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  /* ================= HELPERS ================= */

  const calculateDaysRemaining = (date) => {
    if (!date || date === "N/A") return "N/A";

    const [day, month, year] = date.split("/");
    const eventDate = new Date(year, month - 1, day);

    const diff = Math.ceil(
      (eventDate - new Date()) / (1000 * 60 * 60 * 24)
    );

    return diff > 0 ? `${diff} Days` : "Completed";
  };

  const handleRequestClick = (booking) => {
  setSelectedBooking(booking);
  setIsModalOpen(true);
};
  /* ================= PAGINATION ================= */

  const renderPagination = () => {
    let pages = [];
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${page === i ? "active" : ""}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  /* ================= LOADER ================= */

  if (loading) return <Loader />;

  /* ================= UI ================= */

  return (
    <>
      <div className="table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Booking ID</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Event Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>City</th>
              <th>Requirements</th>
               <th>Days Left</th>
              <th>Status</th> {/* ✅ ADDED */} 
              <th>Request</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.shootId}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{item.shoot_id}</td>
                <td>{item.client_name}</td>
                <td>{item.client_email}</td>
                <td>{item.client_mobile}</td>
                <td>{item.shoot_type}</td>
                <td>{item.event_date}</td>
                <td>{item.event_time}</td>
                <td>{item.event_location}</td>
                <td>{item.photography_requirements}</td>
                <td>{calculateDaysRemaining(item.event_date)}</td>
                  <td className="status">
                    {item.bookingStatus
                      ? item.bookingStatus.charAt(0).toUpperCase() + item.bookingStatus.slice(1)
                      : "N/A"}
                  </td>                
                  <td>
                  <button
                    className="request-btn"
                    onClick={() => handleRequestClick(item)}
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        {renderPagination()}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <BookingRequestModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchBookings}
      />
    </>
  );
};

export default BookingRequestTable;