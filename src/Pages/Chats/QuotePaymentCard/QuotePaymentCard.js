import React from "react";
import "./QuotePaymentCard.css";

const QuotePaymentCard = ({ msg, isMe, formatDate, formatTime }) => {

    const InfoSection = ({ title, children }) => (
  <div className="info-section">
    <div className="section-header">
      <span className="section-title">{title}</span>
    </div>
    <div className="section-content">{children}</div>
  </div>
);

  return (
    <div className={`payment-card ${isMe ? "my-card" : "their-card"}`}>
      
      {/* Header */}
      <div className="payment-card-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4Z"
                  fill="currentColor"
                  opacity="0.9"
                />
              </svg>
            </div>
            <div className="brand-text">
              <span className="card-subtitle">Event Proposal</span>
              <span className="card-title">Budget Summary</span>
            </div>
          </div>

          <div className="amount-section">
            <div className="amount-wrapper">
              <span className="currency">₹</span>
              <span className="card-amount">{msg.budget}</span>
            </div>
            <span className="amount-label">Total Budget</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="card-separator">
        <div className="separator-line" />
        <div className="separator-dot" />
      </div>

      {/* Body */}
      <div className="payment-card-body">

        {/* Event Schedule */}
        <InfoSection
          title="Event Schedule"
          icon="calendar"
        >
          <div className="date-range">
            <div className="date-item">
              <span className="date-label">From</span>
              <span className="date-value">{formatDate(msg.startDate)}</span>
            </div>
            <span className="arrow-icon">→</span>
            <div className="date-item">
              <span className="date-label">To</span>
              <span className="date-value">{formatDate(msg.endDate)}</span>
            </div>
          </div>
        </InfoSection>

        {/* Location */}
        <InfoSection
          title="Venue"
          icon="location"
        >
          <div className="location-text">{msg.location}</div>
        </InfoSection>

        {/* Notes */}
        {msg.message && (
          <div className="note-section">
            <div className="note-header">
              <span className="note-title">Special Notes</span>
            </div>
            <p className="note-text">"{msg.message}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="payment-card-footer">
        <div className="footer-content">
          <div className="timestamp">
            {msg.createdAt ? formatTime(msg.createdAt) : "Just now"}
          </div>
          <div className="status-indicator">
            <span className="status-dot" />
            <span className="status-text">Sent</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default QuotePaymentCard;
