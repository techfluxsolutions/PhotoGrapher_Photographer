/*
Previous login code (email/password) hidden per request.

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { LoginAPI } from "../../utils/APIs/credentialsApis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encryptData } from "../../utils/CRYPTO/cryptoFunction";
import Loader from "../../Template/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()

    // const DEV_BYPASS = false; // 🔴 turn OFF in production

//   const handleLoginClick = async (e) => {
//   e.preventDefault();
//   if (!email || !password) return;

//   setLoading(true);

//   try {
//     const body = { email, password };
//     const response = await LoginAPI(body);

//     if (response?.data?.success && response?.status === 200) {
//       const token = encryptData(response?.data?.data?.token);
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("loggedIn", "true");
//       sessionStorage.setItem("myId",response?.data?.data?.admin?.id)
//       toast.success(response?.data?.message);
//       navigate("/dashboard");
//     } else {
//       if (DEV_BYPASS) {
//         sessionStorage.setItem("token", "DEV_TOKEN");
//         sessionStorage.setItem("loggedIn", "true");
//         toast.warn("DEV MODE: Login bypassed");
//         navigate("/dashboard");
//       } else {
//         toast.error(response?.data?.message || "Login Failed!");
//       }
//     }
//   } catch (err) {
//     if (DEV_BYPASS) {
//       sessionStorage.setItem("token", "DEV_TOKEN");
//       sessionStorage.setItem("loggedIn", "true");
//       toast.warn("DEV MODE: API down, bypass login");
//       navigate("/dashboard");
//     } else {
//       toast.error(err.message || "Login failed");
//     }
//   } finally {
//     setLoading(false);
//   }
// };

const handleLoginClick = async (e) => {
  e.preventDefault();
  if (!email || !password) return;

  setLoading(true);

  try {
    const body = { email, password };
    const response = await LoginAPI(body);

    // ✅ If login success
    if (response?.status === 200 && response?.data?.data?.token) {
      const token = encryptData(response?.data?.data?.token);

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("myId", response?.data?.data?.admin?.id);

      toast.success(response?.data?.message);
      navigate("/dashboard");
    } else {
      // ✅ Show backend message directly
      toast.error(response?.data?.message || "Login Failed!");
    }

  } catch (err) {
    // ✅ If backend sends error response like:
    // { message: "Invalid email or password" }

    const errorMessage =
      err?.response?.data?.message || err.message || "Login Failed!";

    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  if(loading){
    return <Loader/>
  }

  return (
    <div className="main-container">
      <div className="container login-container">
        <form className="login-form" onSubmit={handleLoginClick}>
          <h2 className="text-center mb-4 login-text"
          style={{fontWeight:"600"}}
          >Photographer - Login</h2>

          <label className="login-label">Email </label>
          <input
            type="email"
            className="login-input login-input-manual"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label mt-3">Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="forgot-password">
          <span
            onClick={() => navigate("/forgot-password")}
            className="forgot-password-link"
          >
            Forgot Password?
          </span>
        </div>


          <div className="login-btn-container">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
*/

import React, { useEffect, useState } from "react";
import "./Login.css";
import { SendOtpAPI, VerifyOTP } from "../../utils/APIs/credentialsApis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encryptData } from "../../utils/CRYPTO/cryptoFunction";
import Loader from "../../Template/Loader/Loader";
import OtpModal from "../OtpModal/OtpModal";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const handleSendOtp = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        mobileNumber: phone,
        role: "photographer",
      };

      const response = await SendOtpAPI(payload);
      const isSuccess =
        response?.status === 200 &&
        (response?.data?.success === true || response?.data?.status === true);

      if (isSuccess) {
        toast.success(response?.data?.message || "OTP sent successfully");
        setShowOtpModal(true);
        setTimer(60);
        setCanResend(false);
      } else {
        toast.error(response?.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otpString) => {
    if (!otpString || otpString.length < 4) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        mobileNumber: phone,
        role: "photographer",
        otp: otpString,
      };

      const response = await VerifyOTP(payload);
      const token =
        response?.data?.token || response?.data?.data?.token || null;
      const isSuccess =
        response?.status === 200 &&
        (response?.data?.success === true ||
          response?.data?.status === true ||
          !!token);

      if (isSuccess) {

        if (token) {
          sessionStorage.setItem("token", encryptData(token));
          sessionStorage.setItem("loggedIn", "true");
        }

        toast.success(response?.data?.message || "OTP verified");
        setShowOtpModal(false);
        navigate("/dashboard");
      } else {
        toast.error(response?.data?.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      {loading && <Loader />}

      <div className="container login-container">
        <form className="login-form" onSubmit={handleSendOtp}>
          <h2 className="text-center mb-4 login-text" style={{ fontWeight: "600" }}>
            Photographer - Login
          </h2>

          <label className="login-label">Mobile Number</label>
          <input
            type="text"
            className="login-input login-input-manual"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={10}
            required
          />

          <div className="login-btn-container">
            <button type="submit" className="login-btn">
              Send OTP
            </button>
          </div>
        </form>
      </div>

      <OtpModal
        isOpen={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        onVerify={handleVerifyOtp}
        timer={timer}
        canResend={canResend}
        onResend={handleSendOtp}
        loading={loading}
      />
    </div>
  );
};

export default Login;
