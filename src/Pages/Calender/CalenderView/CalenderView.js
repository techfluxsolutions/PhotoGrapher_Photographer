// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// import "./CalenderView.css";
// import CalenderDisplayDataModal from "../CalenderDisplayDataModal/CalenderDisplayDataModal";
// import { getAcceptedBookings } from "../../../utils/APIs/bookingsApis";

// const CalenderView = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // useEffect(() => {
//   //   fetchAcceptedBookings();
//   // }, []);

//   /* 🔹 Convert "15/03/2026" + "05:30 am" → JS Date */
//   const parseDateTime = (dateStr, timeStr) => {
//     if (!dateStr || !timeStr) return null;

//     const [day, month, year] = dateStr.split("/").map(Number);

//     let [time, meridian] = timeStr.split(" ");
//     let [hours, minutes] = time.split(":").map(Number);

//     if (meridian.toLowerCase() === "pm" && hours !== 12) hours += 12;
//     if (meridian.toLowerCase() === "am" && hours === 12) hours = 0;

//     return new Date(year, month - 1, day, hours, minutes);
//   };

//   // const fetchAcceptedBookings = async () => {
//   //   try {
//   //     const response = await getAcceptedBookings(1, 100);

//   //     if (response?.data?.success) {
//   //       const bookings = response.data.data.bookings || [];

//   //       const formattedEvents = bookings
//   //         .map((booking) => {
//   //           const startDateTime = parseDateTime(
//   //             booking.date,
//   //             booking.time
//   //           );

//   //           if (!startDateTime) return null;

//   //           // ✅ Add 1-hour duration ONLY for layout
//   //           const endDateTime = new Date(startDateTime);
//   //           endDateTime.setHours(endDateTime.getHours() + 1);

//   //           return {
//   //             title: booking.eventType,
//   //             start: startDateTime,
//   //             end: endDateTime, // used for height only
//   //             allDay: false,
//   //             extendedProps: {
//   //               eventType: booking.eventType,
//   //               date: booking.date,
//   //               time: booking.time,
//   //               city: booking.city,
//   //               clientName: booking.client_id?.username,
//   //             },
//   //           };
//   //         })
//   //         .filter(Boolean);

//   //       setEvents(formattedEvents);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching accepted bookings:", error);
//   //   }
//   // };


//   useEffect(() => {
//   const fetchAcceptedBookings = async () => {
//     try {
//       const response = await getAcceptedBookings(1, 100);

//       if (response?.data?.success) {
//         const bookings = response.data.data.bookings || [];

//         const formattedEvents = bookings
//           .map((booking) => {
//             const startDateTime = parseDateTime(
//               booking.date,
//               booking.time
//             );

//             if (!startDateTime) return null;

//             const endDateTime = new Date(startDateTime);
//             endDateTime.setHours(endDateTime.getHours() + 1);

//             return {
//               title: booking.eventType,
//               start: startDateTime,
//               end: endDateTime,
//               allDay: false,
//               extendedProps: {
//                 eventType: booking.eventType,
//                 date: booking.date,
//                 time: booking.time,
//                 city: booking.city,
//                 clientName: booking.client_id?.username,
//               },
//             };
//           })
//           .filter(Boolean);

//         setEvents(formattedEvents);
//       }
//     } catch (error) {
//       console.error("Error fetching accepted bookings:", error);
//     }
//   };

//   fetchAcceptedBookings();
// }, []);


//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event.extendedProps);
//     setIsModalOpen(true);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay",
//         }}
//         events={events}
//         eventClick={handleEventClick}
//         selectable={false}
//         height="auto"
//         displayEventEnd={false}   // ✅ hides "– 6:30"
//       />

//       {isModalOpen && (
//         <CalenderDisplayDataModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           data={selectedEvent}
//         />
//       )}
//     </div>
//   );
// };

// export default CalenderView;


import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./CalenderView.css";
import CalenderDisplayDataModal from "../CalenderDisplayDataModal/CalenderDisplayDataModal";
import { getAcceptedBookings } from "../../../utils/APIs/bookingsApis";

const CalenderView = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAcceptedBookings = async () => {
      try {
        const response = await getAcceptedBookings(1, 100);

        if (response?.data?.success) {
          const bookings = response.data.data.bookings || [];

          const formattedEvents = bookings
            .map((booking) => {
              if (!booking.date) return null;

              const [day, month, year] = booking.date.split("/").map(Number);

              const eventDate = new Date(year, month - 1, day);

              return {
                title: booking.eventType,
                start: eventDate,
                allDay: true, // ✅ full day event
                extendedProps: {
                  eventType: booking.eventType,
                  date: booking.date,
                  time: booking.time,
                  city: booking.city,
                  clientName: booking.client_id?.username,
                },
              };
            })
            .filter(Boolean);

          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching accepted bookings:", error);
      }
    };

    fetchAcceptedBookings();
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={handleEventClick}
        selectable={false}
        height="auto"
        displayEventTime={false} // ❌ hide time everywhere
        allDaySlot={true}
      />

      {isModalOpen && (
        <CalenderDisplayDataModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedEvent}
        />
      )}
    </div>
  );
};

export default CalenderView;