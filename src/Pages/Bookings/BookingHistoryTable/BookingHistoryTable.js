import { useCallback, useEffect, useState } from "react";
import { FiEdit, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import EditBookingModal from "../EditBookingModal/EditBookingModal";

import "../../Bookings/BookingsTable/BookingsTable.css";
import { getBookingHistory } from "../../../utils/APIs/bookingsApis";
import Loader from "../../../Template/Loader/Loader";

const BookingHistoryTable = ({ page: initialPage = 1, limit = 10 }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  /* ================= FETCH BOOKINGS ================= */

  // const fetchBookings = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await getBookingHistory(page, limit);

  //     if (res?.data?.success) {
  //       const { bookings, meta } = res.data.data;

  //       const mappedData = bookings.map((item) => ({
  //         shootId: item._id,
  //         shoot_id: item.bookingId || "N/A",
  //         client_name: item.client_id?.username || "N/A",
  //         client_email: item.client_id?.email || "N/A",
  //         client_mobile: item.client_id?.mobileNumber || "N/A",
  //         shoot_type: item.eventType || "N/A",
  //         event_date: item.date || "N/A",
  //         event_time: item.time || "N/A",
  //         event_location: item.city || "N/A",
  //         photography_requirements: item.requirements || "N/A",
  //         status: item.status || "completed",
  //         daysLeft: item.daysLeft || "N/A",
  //       }));

  //       setData(mappedData);
  //       setTotalPages(Math.ceil(meta.total / meta.limit));
  //     }
  //   } catch (error) {
  //     console.error("Booking history fetch error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBookings();
  // }, [page]);


  const fetchBookings = useCallback(async () => {
  try {
    setLoading(true);

    const res = await getBookingHistory(page, limit);

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
        status: item.status || "completed",
        daysLeft: item.daysLeft || "N/A",
         budget: item.photographerAmount || "N/A",
      }));

      setData(mappedData);
      setTotalPages(Math.ceil(meta.total / meta.limit));
    }
  } catch (error) {
    console.error("Booking history fetch error", error);
  } finally {
    setLoading(false);
  }
}, [page, limit]);

 useEffect(() => {
  fetchBookings();
}, [fetchBookings]);

  /* ================= HELPERS ================= */

  const handleGalleryUpload = (booking) => {
    console.log("BOOKING HISTORY",booking)
    navigate(`/bookings/gallery-upload/${booking.shootId}`, {
      state: { booking },
    });
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
              {/* <th>Email</th>
              <th>Mobile</th> */}
              <th>Event Type</th>
              <th>Date</th>
              {/* <th>Time</th> */}
              <th>City</th>
              <th>Budget</th>
              <th>Requirements</th>
              <th>Gallery</th>
              <th>Days Left</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="14" style={{ textAlign: "center" }}>
                  No booking history found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.shootId}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{item.shoot_id}</td>
                  {/* <td>{item.client_name}</td>
                  <td>{item.client_email}</td> */}
                  <td>{item.client_mobile}</td>
                  <td>{item.shoot_type}</td>
                  <td>{item.event_date}</td>
                  {/* <td>{item.event_time}</td> */}
                  <td>{item.event_location}</td>
                  <td>{item.budget}</td>
                  <td>{item.photography_requirements}</td>

                  <td>
                    <FiUpload
                      size={18}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleGalleryUpload(item)}
                    />
                  </td>

                  <td>{item.daysLeft}</td>

                  <td>
                    <span className={`status status-${item.status}`}>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </td>

                  <td>
                    <FiEdit
                      size={16}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedBooking(item);
                        setShowEditModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}

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

      {/* ================= EDIT MODAL ================= */}

      <EditBookingModal
        booking={selectedBooking}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={fetchBookings}
      />
    </>
  );
};

export default BookingHistoryTable;