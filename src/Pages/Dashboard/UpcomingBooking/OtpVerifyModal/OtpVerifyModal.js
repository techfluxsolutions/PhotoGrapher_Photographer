import { useEffect, useRef, useState } from "react";
import "./OtpVerifyModal.css";

const OtpVerifyModal = ({ show, onClose, onVerify, loading, mobile }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  // ✅ ALWAYS call hooks first
  useEffect(() => {
    if (show) {
      setOtp(["", "", "", ""]); // reset OTP

      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);
    }
  }, [show]);

  // ❗ AFTER hooks, then condition
  if (!show) return null;

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 4) {
      alert("Enter valid OTP");
      return;
    }

    onVerify(finalOtp);
  };

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h3>Verify OTP</h3>

        <p className="otp-mobile-text">
          OTP sent to <strong>{mobile}</strong>
        </p>

        <div className="otp-box-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-box"
            />
          ))}
        </div>

        <div className="otp-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="btn-verify"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerifyModal;