import React, { useState } from "react";
import { downloadInvoiceAPI } from "../../../utils/APIs/paymentApis";
import "./PaymentTable.css";

const ROWS_PER_PAGE = 10;

const PaymentTable = ({ data = [], startIndex = 0 }) => {
  const handleDownload = async (invoiceId) => {
    try {
      if (!invoiceId) {
        alert("Invoice ID not found");
        return;
      }
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
              <th>Payment Date</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.bookingId}</td>
                  <td>{item.eventType}</td>
                  <td>{item.clientName}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.paymentDate}</td>
                  <td>
                    <span
                      className={`status ${item.paymentStatus?.toLowerCase() || "pending"}`}
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
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No payouts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentTable;
