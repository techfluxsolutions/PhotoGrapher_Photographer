// import { useEffect, useState } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "../AuthModule/Login/Login";
// import Layout from "../Template/LayoutMain/LayoutMain/Layout";
// import InternetChecker from "../utils/InternetChecker/InternetChecker";
// import ScrollToTop from "../utils/scrollToTop/ScrollToTop";
// import Dashboard from "../Pages/Dashboard/Dashboard";
// import Bookings from "../Pages/Bookings/Bookings";
// import MyQuote from "../Pages/MyQuote/MyQuote";
// import Payment from "../Pages/Payment/Payment";
// import Customer from "../Pages/Customer/Customer";
// import Chats from "../Pages/Chats/Chats";
// import { ChatDataProvider } from "../Context/chatDataContext";
// import Services from "../Pages/Services/Services";
// import ServicesPricingPage from "../Pages/Services/ServicesPricingPage/ServicesPricingPage";
// import GalleryAddPhotos from "../Pages/Bookings/GalleryAddPhotos/GalleryAddPhotos";
// // hii
// const AppRoutes = () => {
//   const [isOffline, setIsOffline] = useState(false);

//   useEffect(() => {
//     const handleOffline = () => setIsOffline(true);
//     const handleOnline = () => setIsOffline(false);

//     window.addEventListener("offline", handleOffline);
//     window.addEventListener("online", handleOnline);

//     return () => {
//       window.removeEventListener("offline", handleOffline);
//       window.removeEventListener("online", handleOnline);
//     };
//   }, []);

//   // ✅ UI-ONLY PRIVATE ROUTE
//   const PrivateRoute = ({ children }) => {
//     const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

//     if (!isLoggedIn) {
//       return <Navigate to="/" replace />;
//     }

//     return children;
//   };

//   return (
//     <>
//       <ScrollToTop />
//       {isOffline && <InternetChecker />}

//       <Routes>
//         {/* Public Route */}
//         <Route path="/" element={<Login />} />
//         {/* Protected Routes */}
//         <Route
//           element={
//             <PrivateRoute>
//               <ChatDataProvider>
//                 <Layout />
//               </ChatDataProvider>
//             </PrivateRoute>
//           }
//         >
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* <Route path="/bookings" element={<Bookings />} /> */}
//           <Route path="/my-quote" element={<MyQuote />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/services-pricing" element={<ServicesPricingPage />} />
//           <Routes>
//       <Route path="/bookings" element={<Bookings />} />
//       <Route
//         path="/bookings/gallery-upload/:bookingId"
//         element={<GalleryAddPhotos />}
//       />
//     </Routes>

                    
//           <Route path="/customer" element={<Customer />} />
//           <Route path="/chat/booking/:bookingId" element={<Chats chatType="booking" />} />
//           <Route path="/chat/quote/:quoteId" element={<Chats chatType="quote" />} />

//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </>
//   );
// };

// export default AppRoutes;


import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../AuthModule/Login/Login";
import Layout from "../Template/LayoutMain/LayoutMain/Layout";
import InternetChecker from "../utils/InternetChecker/InternetChecker";
import ScrollToTop from "../utils/scrollToTop/ScrollToTop";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Bookings from "../Pages/Bookings/Bookings";
import GalleryAddPhotos from "../Pages/Bookings/GalleryAddPhotos/GalleryAddPhotos";
import MyQuote from "../Pages/MyQuote/MyQuote";
import Payment from "../Pages/Payment/Payment";
import Customer from "../Pages/Customer/Customer";
import Chats from "../Pages/Chats/Chats";
import Services from "../Pages/Services/Services";
import ServicesPricingPage from "../Pages/Services/ServicesPricingPage/ServicesPricingPage";
import { ChatDataProvider } from "../Context/chatDataContext";

const AppRoutes = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const offline = () => setIsOffline(true);
    const online = () => setIsOffline(false);

    window.addEventListener("offline", offline);
    window.addEventListener("online", online);

    return () => {
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", online);
    };
  }, []);

  const PrivateRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      <ScrollToTop />
      {isOffline && <InternetChecker />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route
          element={
            <PrivateRoute>
              <ChatDataProvider>
                <Layout />
              </ChatDataProvider>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ✅ BOOKINGS */}
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="/bookings/gallery-upload/:bookingId"
            element={<GalleryAddPhotos />}
          />

          <Route path="/my-quote" element={<MyQuote />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services-pricing" element={<ServicesPricingPage />} />
          <Route path="/customer" element={<Customer />} />

          <Route
            path="/chat/booking/:bookingId"
            element={<Chats chatType="booking" />}
          />
          <Route
            path="/chat/quote/:quoteId"
            element={<Chats chatType="quote" />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
