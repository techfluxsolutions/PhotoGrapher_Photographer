import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import "bootstrap/dist/css/bootstrap.min.css"; // Optional, if using Bootstrap

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
