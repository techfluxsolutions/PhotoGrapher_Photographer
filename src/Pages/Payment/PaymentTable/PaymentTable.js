import React, { useState } from "react";
import { downloadInvoiceAPI } from "../../../utils/APIs/paymentApis";
import "./PaymentTable.css";

const ROWS_PER_PAGE = 10;

// ✅ Dummy Data
const dummyPayments = [
  {
    id: "1",
    bookingId: "BK-1001",
    eventType: "Wedding Photography",
    clientName: "Rahul Sharma",
    totalAmount: "₹50,000",
    paidAmount: "₹30,000",
    pendingAmount: "₹20,000",
    paymentDate: "12 Feb 2026",
    paymentStatus: "Partial",
    invoiceDbId: "INV-001",
  },
  {
    id: "2",
    bookingId: "BK-1002",
    eventType: "Corporate Shoot",
    clientName: "Infosys Ltd",
    totalAmount: "₹75,000",
    paidAmount: "₹75,000",
    pendingAmount: "₹0",
    paymentDate: "15 Feb 2026",
    paymentStatus: "Paid",
    invoiceDbId: "INV-002",
  },
  {
    id: "3",
    bookingId: "BK-1003",
    eventType: "Birthday Event",
    clientName: "Anita Verma",
    totalAmount: "₹25,000",
    paidAmount: "₹10,000",
    pendingAmount: "₹15,000",
    paymentDate: "18 Feb 2026",
    paymentStatus: "Pending",
    invoiceDbId: "INV-003",
  },
];

const PaymentTable = ({ data = [] }) => {
  const tableData = data.length > 0 ? data : dummyPayments;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableData.length / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentData = tableData.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  const handleDownload = async (invoiceId) => {
    try {
      const res = await downloadInvoiceAPI(invoiceId);

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Invoice download failed", err);
      alert("Failed to download invoice");
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="quote-table-wrapper">
        <table className="quote-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Booking ID</th>
              <th>Event Type</th>
              <th>Client Name</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>Pending Amount</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id || index}>
                <td>{startIndex + index + 1}</td>
                <td>{item.bookingId}</td>
                <td>{item.eventType}</td>
                <td>{item.clientName}</td>
                <td>{item.totalAmount}</td>
                <td>{item.paidAmount}</td>
                <td>{item.pendingAmount}</td>
                <td>{item.paymentDate}</td>
                <td>
                  <span
                    className={`status ${item.paymentStatus.toLowerCase()}`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td>
                  <button
                    className="download-btn"
                    onClick={() => handleDownload(item.invoiceDbId)}
                  >
                    ⬇
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {renderPageNumbers()}

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default PaymentTable;
