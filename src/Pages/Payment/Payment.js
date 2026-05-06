import React, { useEffect, useState } from "react";
import { getPaymentsAPI } from "../../utils/APIs/paymentApis";
import PaymentTable from "./PaymentTable/PaymentTable";
import Loader from "../../Template/Loader/Loader";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("isSidebarOpen");
      const parsed = stored !== null ? JSON.parse(stored) : true;

      if (parsed !== isSidebarOpen) {
        setIsSidebarOpen(parsed);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isSidebarOpen]);

  const mapPaymentsResponse = (payouts = []) =>
    payouts.map((item) => ({
      id: item._id,
      bookingId: item.veroa_id,
      eventType: item.event_type,
      clientName: item.client_name,
      totalAmount: `₹${item.photographer_share?.toLocaleString("en-IN") || 0}`,
      paymentDate: item.event_date,
      paymentStatus: item.status || "Pending",
      invoiceDbId: item.booking_id_raw,
    }));

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getPaymentsAPI(page, 10);
      if (res?.data?.success) {
        setPayments(mapPaymentsResponse(res.data.data));
        // Note: Backend getAll doesn't seem to return meta for pagination yet, 
        // but we can set total based on data length for now or adjust backend.
        setTotal(res.data.data.length); 
      }
    } catch (err) {
      console.error("Payments fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page]);

  const LIMIT = 10;
  const totalPages = Math.ceil(total / LIMIT);

  if (loading) return <Loader />;

  return (
    <div
      className={`content-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ marginTop: "100px" }}
    >
      <div className="page-inner-wrapper">
        <h2 className="page-title mb-5 mt-2">Payout</h2>

        <PaymentTable data={payments} startIndex={(page - 1) * 10} />

        {total > LIMIT && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>

            <button
              className="pagination-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
