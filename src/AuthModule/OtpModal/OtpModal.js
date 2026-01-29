// import React, { useState, useRef } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import "./OtpModal.css";
// import { VerifyOtpAPI } from "../../utils/APIs/credentialsApis";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loader from "../../Template/Loader/Loader";

// const OtpModal = ({ isOpen, onHide, email, SucMsg, onSuccess }) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
//   const inputRefs = useRef([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e, index) => {
//     const value = e.target.value.slice(0, 1);

//     if (!/^[0-9]$/.test(value) && value !== "") return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) inputRefs.current[index + 1].focus();
//     if (!value && index > 0) inputRefs.current[index - 1].focus();
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (otp.some((digit) => digit === "")) {
//       toast.error("Please enter full 6-digit OTP");
//       return;
//     }

//     const otpString = otp.join("");

//     const body = {
//       email: email,
//       otp: otpString,
//     };

//     try {
//       setLoading(true); 
//       const response = await VerifyOtpAPI(body);
//       console.log("OTP RESPONSE:", response?.data);
//       setLoading(false);

//       if (response?.data?.success) {
//         toast.success(response?.data?.message || "OTP verified successfully");
//         sessionStorage.setItem("TokenForHireRooferAdmin", response?.data?.token);
//         sessionStorage.setItem("HireRooferAdminUser", JSON.stringify(response?.data?.user));
//         sessionStorage.setItem("isLoggedIn", "true");

//         onHide();
//         if (onSuccess) onSuccess();
//       } else {
//         toast.error(response?.data?.message || "Invalid OTP");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error(
//         error?.response?.data?.message || "Something went wrong, try again"
//       );
//     }
//   };

//   return (
//     <Modal show={isOpen} onHide={onHide} centered>
//       {loading && <Loader />}
//       <Modal.Header style={{ padding: "0" }}>
//         <Modal.Title
//           style={{
//             width: "100%",
//             padding: "10px",
//             textAlign: "center",
//           }}
//         >
//           <h2
//             style={{
//               margin: "0",
//               fontSize: "24px",
//               padding: "10px 0",
//               borderRadius: "8px",
//               textAlign: "center",
//             }}
//           >
//             Verify Account
//           </h2>
//         </Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="otp">
//             <label className="otp-label">
//               {SucMsg || "Enter the OTP sent to your email"}
//             </label>

//             <div className="otp-input-container">
//               {otp.map((digit, index) => (
//                 <Form.Control
//                   key={index}
//                   type="text"
//                   value={digit}
//                   maxLength="1"
//                   onChange={(e) => handleChange(e, index)}
//                   className="otp-input"
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   required
//                 />
//               ))}
//             </div>
//           </Form.Group>

//           <hr />

//           <div className="login-btn-container">
//             <button type="submit" className="login-btn" style={{ width: "50%" }}>
//               Verify
//             </button>
//           </div>

//           <span
//             style={{ display: "block", textAlign: "center" }}
//             className="CreateAccount-text"
//           >
//             OR
//           </span>

//           <div className="modal-sign-btn">
//             <Button type="button" className="SignIn-btn" onClick={onHide}>
//               Cancel
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default OtpModal;




import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./OtpModal.css";

const OtpModal = ({ isOpen, onHide, SucMsg, onSuccess }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    if (!/^[0-9]$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.some((d) => d === "")) {
      alert("Please enter full 4-digit OTP");
      return;
    }

    onHide();
    onSuccess && onSuccess(); // 👉 navigate to dashboard
  };

  return (
    <Modal show={isOpen} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title className="w-100 text-center">
          Verify Account
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <label className="otp-label">{SucMsg}</label>

          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <Form.Control
                key={index}
                value={digit}
                maxLength="1"
                className="otp-input"
                onChange={(e) => handleChange(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <div className="login-btn-container mt-4">
            <button type="submit" className="login-btn" style={{ width: "50%" }}>
              Verify
            </button>
          </div>

          <div className="text-center mt-3">OR</div>

          <div className="modal-sign-btn">
            <Button onClick={onHide}>Cancel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
