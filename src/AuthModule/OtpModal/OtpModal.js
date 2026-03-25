import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import "./OtpModal.css";

const OtpModal = ({
  isOpen,
  onHide,
  onVerify,
  timer = 0,
  canResend = false,
  onResend,
  loading = false,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    if (!/^[0-9]$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.some((d) => d === "")) {
      alert("Please enter full 4-digit OTP");
      return;
    }

    if (onVerify) {
      await onVerify(otp.join(""));
    }
  };

  const handleResendClick = async () => {
    setOtp(["", "", "", ""]);
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
    if (onResend) {
      await onResend();
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onHide}
      centered
      dialogClassName="otp-modal-dialog"
      contentClassName="otp-modal-content"
    >
      <Modal.Body className="otp-modal-body">
        <div className="login-wrapper otp-modal-wrapper">
          <div className="login-card">
            <button
              type="button"
              className="otp-close"
              aria-label="Close"
              onClick={onHide}
              disabled={loading}
            >
              x
            </button>

            <div className="login-title text-center">Verify OTP</div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">

                <div className="otp-group">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      value={digit}
                      maxLength="1"
                      className="otp-input"
                      onChange={(e) => handleChange(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center mt-2">
                {canResend ? (
                  <span
                    className="resend-txt"
                    style={{ cursor: "pointer" }}
                    onClick={handleResendClick}
                  >
                    Resend OTP
                  </span>
                ) : (
                  <span className="resend-txt">Resend OTP in {timer}s</span>
                )}
              </div>

              <div className="login-btn-container mt-4">
                <button type="submit" className="login-btn" disabled={loading}>
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
