// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import RootLayout from '../Layout/RootLayout';
// import Button from '../common/Button';
// import AddEventModal from '../ModalBox/AddEventModal'
// import { toast } from 'react-toastify';
// import { postAPI } from '../network';
// // Initialize localizer
// const localizer = momentLocalizer(moment);
// const toastObj = {position: "top-right"};

// // // Sample events data
// const events = [
//     {
//         title: 'Meeting',
//         start: new Date(2024, 3, 5, 10, 0), // year, month (0-indexed), day, hour, minute
//         end: new Date(2024, 3, 5, 12, 0),
//     },
//     {
//         title: 'Meet',
//         start: new Date(2024, 3, 5, 9, 0), // year, month (0-indexed), day, hour, minute
//         end: new Date(2024, 3, 5, 10, 0),
//     },
//     {
//         title: 'Meets',
//         start: new Date(2024, 3, 5, 9, 0), // year, month (0-indexed), day, hour, minute
//         end: new Date(2024, 3, 5, 10, 0),
//     },
//     {
//         title: 'Conference',
//         start: new Date(2024, 3, 8, 13, 0),
//         end: new Date(2024, 3, 8, 12, 30),
//     },
//     {
//         title: 'Interview',
//         start: new Date(2024, 3, 8, 13, 0),
//         end: new Date(2024, 3, 8, 14, 0),
//     },
//     {
//         title: 'Interview',
//         start: new Date(2024, 3, 8, 15, 0),
//         end: new Date(2024, 3, 8, 17, 0),
//     },
//     {
//         title: 'Interview',
//         start: new Date(2024, 3, 8, 13, 0),
//         end: new Date(2024, 3, 8, 17, 0),
//     },
// ];

// const Scheduler = () => {
//     const [modalOpen, setModalOpen] = useState(false)

//     const onEventAdded = async(event) => {
//         console.log(event,"event.start-----");

//     const startDate = event.start._d ? event.start._d : event.start;
//     const endDate = event.end._d ? event.end._d : event.end;
//     // console.log(event.start,"event.start");

//     // Extracting date and time components
//     const year_start = startDate.getFullYear();
//     const month_start = startDate.getMonth();
//     const day_start = startDate.getDate();
//     const hour_start = startDate.getHours();
//     const minute_start = startDate.getMinutes();

//     const year_end = endDate.getFullYear();
//     const month_end = endDate.getMonth();
//     const day_end = endDate.getDate();
//     const hour_end = endDate.getHours();
//     const minute_end = endDate.getMinutes();

//         console.log(year_start,month_start+1,day_start,hour_start,minute_start,"start timedate");
//         console.log(year_end,month_end+1,day_end,hour_end,minute_end,"end timedate");

//         const formdata={
//             candidate_id:event.candidate_id,
//             job_id:event.job_id,
//             title:event.title,
//             start_time:new Date(year_start, month_start+1, day_start, hour_start, minute_start),
//             end_time:new Date(year_end, month_end+1, day_end, hour_end, minute_end)

//         }
//         // console.log(formdata,"formdata");
//         try {
//             let data = await postAPI('/addShedule', formdata);
//             if (data) {
//                 closeModal();
//             }
//         } catch (error) {
//             toast.error("Please Try Again", toastObj);
//         }

//     }
//     const ModalOpen = (open) => {
//         setModalOpen(true)
//     }
//     const closeModal = () => {
//         setModalOpen(false)
//     }

//     return (
//         <RootLayout>
//             <div style={{ zIndex: -1, position: 'absolute', width: '80%' }}>
//                 <div className='flex justify-center mt-3'  >
//                     <div className='w-5/12' ><div onClick={() => ModalOpen('open')}><Button title={'Add Event'} ></Button></div></div></div>

//                 <div style={{ height: 500, marginTop: '5rem', zIndex: -1, }}>
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ flex: 1 }}
//                     />
//                 </div>
//             </div>

//             {
//             modalOpen ? (

//                     <AddEventModal
//                         isOpen={modalOpen}
//                         closeModal={() => closeModal()}
//                         onEventAdded={event => onEventAdded(event)}
//                     />
//                 ) : (''
//                     // <ConfirmationModal show={alertOpen} onClose={closeAlert} />
//                 )
//             }

//         </RootLayout>
//     )
// };

// export default Scheduler;








// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import RootLayout from "../Layout/RootLayout";
// import Button from "../common/Button";
// import AddEventModal from "../ModalBox/AddEventModal";
// import { toast } from "react-toastify";
// import { postAPI, getAPI } from "../network";
// // import { Form } from 'react-router-dom';


// const localizer = momentLocalizer(moment);
// const toastObj = { position: "top-right" };

// const Scheduler = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [candidates, setCandidates] = useState([]);

  

//   useEffect(() => {
//     // fetchCandidates();
//     fetchEvents()
//   },[]); // Fetch events when the component mounts
// // Fetch events when the component mounts



//   const fetchEvents = async () => {
//     console.log(candidates,"candidate");

//     try {
//       // 
//       const eventData = await getAPI("/getSchedule");
//       // console.log(eventData,"Evntdta")

//       // Format fetched event data for React Big Calendar
//       const events = eventData.map((event) => ({
//         schedule_id: event.schedule_id, // Assuming each event object has an ID
//         candidate_id:event.candidate_id,
//         title: `${event.title} (${event.candidate_name})`, 
//         // candidate_name:event.candidate_name,
//         start: new Date(event.start_time),
//         end: new Date(event.end_time),
//       }));

//       console.log(events,"formattedEvents----------")

//       setEvents(events);
//     } catch (error) {
//       toast.error("Failed to fetch events. Please try again.", toastObj);
//     }
//   };
// const onEventDelete = (event)=>{
//    console.log(event,"delete")
// }




//   const onEventAdded = async (event) => {
//     const startDate = event.start._d ? event.start._d : event.start;
//     const endDate = event.end._d ? event.end._d : event.end;

//     const year_start = startDate.getFullYear();
//     const month_start = startDate.getMonth() + 1;
//     const day_start = startDate.getDate();
//     const hour_start = startDate.getHours();
//     const minute_start = startDate.getMinutes();

//     const year_end = endDate.getFullYear();
//     const month_end = endDate.getMonth() + 1;
//     const day_end = endDate.getDate();
//     const hour_end = endDate.getHours();
//     const minute_end = endDate.getMinutes();

//     const formdata = {
//       candidate_id:event.candidate_id,
//       candidate_name:event.candidate_name,
//       job_id: event.job_id,
//       title: event.title,
//       start_time: new Date(
//         year_start,
//         month_start-1,
//         day_start,
//         hour_start,
//         minute_start
//       ),
//       end_time: new Date(year_end, month_end-1, day_end, hour_end, minute_end),
//     };

//     try {
//       console.log(formdata,'dta');
//     //   Send the event data to the backend API
//       let data = await postAPI('/addSchedule', formdata);
//       if (data) {
//           closeModal();
//           // After adding the event to the database, refetch events to update the calendar
//           fetchEvents();
//       }
//     } catch (error) {
//       toast.error("Failed to add event. Please try again.", toastObj);
//     }
//   };
  
//   const ModalOpen = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };
//   // const handleReloadPage = () => {
//   //   window.location.reload();
//   // };
  

//   return (
//     <RootLayout>
//       <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
//         <div className="flex justify-center mt-3">
//           <div className="w-5/12">
//             <div onClick={ModalOpen}>
//               <Button title={"Add Event"} />

//             </div>
//            {/* <div onClick={handleReloadPage}>
//             <Button title={"Back"} onClick={handleReloadPage}/>
//             </div> */}

//           </div>
//         </div>

//         <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ flex: 1 }}

//           />
//         </div>
//       </div>

//       {modalOpen ? (
//         <AddEventModal
//           isOpen={modalOpen}
//           closeModal={closeModal}
//           onEventAdded={(event) => onEventAdded(event)}
//         />
//       ) : (
//         ""
//       )}
      
//     </RootLayout>
//   );
// };

// export default Scheduler;



// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import RootLayout from "../Layout/RootLayout";
// import Button from "../common/Button";
// import AddEventModal from "../ModalBox/AddEventModal";
// import EventDetailsModal from "../ModalBox/EventDetailsModal"; // Import the new modal
// import { toast } from "react-toastify";
// import { postAPI, getAPI } from "../network";

// const localizer = momentLocalizer(moment);
// const toastObj = { position: "top-right" };

// const Scheduler = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [eventDetailsOpen, setEventDetailsOpen] = useState(false); // State for event details modal
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const eventData = await getAPI("/getSchedule");

//       const events = eventData.map((event) => ({
//         schedule_id: event.schedule_id,
//         candidate_id: event.candidate_id,
//         title: `${event.title} (${event.candidate_name})`,
//         candidate_name: event.candidate_name,
//         job_id: event.job_id,
//         start: new Date(event.start_time),
//         end: new Date(event.end_time),
//       }));

//       setEvents(events);
//     } catch (error) {
//       toast.error("Failed to fetch events. Please try again.", toastObj);
//     }
//   };

//   const onEventAdded = async (event) => {
//     const startDate = event.start._d ? event.start._d : event.start;
//     const endDate = event.end._d ? event.end._d : event.end;

//     const formdata = {
//       id: event.schedule_id, // Add an id field for identifying events
//       candidate_id: event.candidate_id,
//       candidate_name: event.candidate_name,
//       job_id: event.job_id,
//       title: event.title,
//       start_time: new Date(startDate),
//       end_time: new Date(endDate),
//     };

//     try {
//       await postAPI('/addSchedule', formdata);
//       closeModal();
//       fetchEvents();
//     } catch (error) {
//       toast.error("Failed to add event. Please try again.", toastObj);
//     }
//   };

//   const onSelectEvent = (event) => {
//     console.log(event,"events");
//     setSelectedEvent(event);
//     setEventDetailsOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const closeEventDetailsModal = () => {
//     setEventDetailsOpen(false);
//     setSelectedEvent(null);
//   };

//   const ModalOpen = () => {
//     setModalOpen(true);
//   };

//   return (
//     <RootLayout>
//       <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
//         <div className="flex justify-center mt-3">
//           <div className="w-5/12">
//             <div onClick={ModalOpen}>
//               <Button title={"Add Event"} />
//             </div>
//           </div>
//         </div>

//         <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ flex: 1 }}
//             onSelectEvent={onSelectEvent}
//           />
//         </div>
//       </div>

//       {modalOpen && (
//         <AddEventModal
//           isOpen={modalOpen}
//           closeModal={closeModal}
//           onEventAdded={onEventAdded}
//         />
//       )}

//       {eventDetailsOpen && (
//         <EventDetailsModal
//           isOpen={eventDetailsOpen}
//           closeModal={closeEventDetailsModal}
//           event={selectedEvent}
//         />
//       )}
//     </RootLayout>
//   );
// };

// export default Scheduler;



// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import RootLayout from "../Layout/RootLayout";
// import Button from "../common/Button";
// import AddEventModal from "../ModalBox/AddEventModal";
// import EventDetailsModal from "../ModalBox/EventDetailsModal"; // Import the new modal
// import { toast } from "react-toastify";
// import { postAPI, getAPI } from "../network";

// const localizer = momentLocalizer(moment);
// const toastObj = { position: "top-right" };

// const Scheduler = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [eventDetailsOpen, setEventDetailsOpen] = useState(false); // State for event details modal
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const eventData = await getAPI("/getSchedule");

//       const events = eventData.map((event) => ({
//         schedule_id: event.schedule_id,
//         candidate_id: event.candidate_id,
//         title: `${event.title} (${event.candidate_name})`,
//         candidate_name: event.candidate_name,
//         job_id: event.job_id, // Ensure job_id is included
//         start: new Date(event.start_time),
//         end: new Date(event.end_time),
//       }));

//       setEvents(events);
//     } catch (error) {
//       toast.error("Failed to fetch events. Please try again.", toastObj);
//     }
//   };

//   const onEventAdded = async (event) => {
//     const startDate = event.start._d ? event.start._d : event.start;
//     const endDate = event.end._d ? event.end._d : event.end;

//     const formdata = {
//       id: event.schedule_id, // Add an id field for identifying events
//       candidate_id: event.candidate_id,
//       candidate_name: event.candidate_name,
//       job_id: event.job_id,
//       title: event.title,
//       start_time: new Date(startDate),
//       end_time: new Date(endDate),
//     };

//     try {
//       await postAPI('/addSchedule', formdata);
//       closeModal();
//       fetchEvents();
//     } catch (error) {
//       toast.error("Failed to add event. Please try again.", toastObj);
//     }
//   };

//   const onSelectEvent = (event) => {
//     console.log(event, "events");
//     setSelectedEvent(event);
//     setEventDetailsOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const closeEventDetailsModal = () => {
//     setEventDetailsOpen(false);
//     setSelectedEvent(null);
//   };

//   const ModalOpen = () => {
//     setModalOpen(true);
//   };

//   return (
//     <RootLayout>
//       <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
//         <div className="flex justify-center mt-3">
//           <div className="w-5/12">
//             <div onClick={ModalOpen}>
//               <Button title={"Add Event"} />
//             </div>
//           </div>
//         </div>

//         <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ flex: 1 }}
//             onSelectEvent={onSelectEvent}
//           />
//         </div>
//       </div>

//       {modalOpen && (
//         <AddEventModal
//           isOpen={modalOpen}
//           closeModal={closeModal}
//           onEventAdded={onEventAdded}
//         />
//       )}

//       {eventDetailsOpen && (
//         <EventDetailsModal
//           isOpen={eventDetailsOpen}
//           closeModal={closeEventDetailsModal}
//           event={selectedEvent}
//         />
//       )}
//     </RootLayout>
//   );
// };

// export default Scheduler;




// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import RootLayout from "../Layout/RootLayout";
// import Button from "../common/Button";
// import AddEventModal from "../ModalBox/AddEventModal";
// import EventDetailsModal from "../ModalBox/EventDetailsModal";
// import { toast } from "react-toastify";
// import { postAPI, getAPI, patchAPI, deleteAPI} from "../network";

// const localizer = momentLocalizer(moment);
// const toastObj = { position: "top-right" };

// const Scheduler = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const eventData = await getAPI("/getSchedule");
//       const events = eventData.map((event) => ({
//         schedule_id: event.schedule_id,
//         candidate_id: event.candidate_id,
//         title: `${event.title}`,
//         candidate_name: event.candidate_name,
//         job_id: event.job_id,
//         start: new Date(event.start_time),
//         end: new Date(event.end_time),
//       }));
//       setEvents(events);
//     } catch (error) {
//       toast.error("Failed to fetch events. Please try again.", toastObj);
//     }
//   };

//   const handleEventAdded = async (event) => {
//     const startDate = event.start._d ? event.start._d : event.start;
//     const endDate = event.end._d ? event.end._d : event.end;

//     const formdata = {
//       id: event.schedule_id,
//       candidate_id: event.candidate_id,
//       candidate_name: event.candidate_name,
//       job_id: event.job_id,
//       title: event.title,
//       start_time: new Date(startDate),
//       end_time: new Date(endDate),
//     };

//     try {
//       await postAPI("/addSchedule", formdata);
//       closeAddEventModal();
//       fetchEvents();
//     } catch (error) {
//       toast.error("Failed to add event. Please try again.", toastObj);
//     }
//   };

//   const handleEventSelect = (event) => {
//     setSelectedEvent(event);
//     setEventDetailsOpen(true);
//   };

//   const closeAddEventModal = () => {
//     setModalOpen(false);
//   };

//   const closeEventDetailsModal = () => {
//     setEventDetailsOpen(false);
//     setSelectedEvent(null);
//   };

//   const handleEventUpdate = async (updatedEvent) => {
//     const formdata = {
//       schedule_id: updatedEvent.schedule_id,
//       candidate_id: updatedEvent.candidate_id,
//       candidate_name: updatedEvent.candidate_name,
//       job_id: updatedEvent.job_id,
//       title: updatedEvent.title,
//       start_time: updatedEvent.start,
//       end_time: updatedEvent.end,
//     };

//     try {
//       const response = await patchAPI("/updateSchedule/:id", formdata);
//       console.log("Update response:", response);
//       setEvents(events.map(event => (event.schedule_id === updatedEvent.schedule_id ? updatedEvent : event)));
//       fetchEvents(); // Refresh the events list
//       closeEventDetailsModal();
//     } catch (error) {
//       toast.error("Failed to update event. Please try again.", toastObj);
//     }
//   };
//   const handleEventDelete = (scheduleId) => {
//     setEvents(events.filter(event => event.schedule_id !== scheduleId));
//   };

  
  

//   return (
//     <RootLayout>
//       <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
//         <div className="flex justify-center mt-3">
//           <div className="w-5/12">
//             <div onClick={() => setModalOpen(true)}>
//               <Button title={"Add Event"} />
//             </div>
//           </div>
//         </div>
//         <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ flex: 1 }}
//             onSelectEvent={handleEventSelect}
//           />
//         </div>
//       </div>
//       {modalOpen && (
//         <AddEventModal
//           isOpen={modalOpen}
//           closeModal={closeAddEventModal}
//           onEventAdded={handleEventAdded}
//         />
//       )}
//       {eventDetailsOpen && (
//         <EventDetailsModal
//           isOpen={eventDetailsOpen}
//           closeModal={closeEventDetailsModal}
//           event={selectedEvent}
//           onUpdate={handleEventUpdate}
//           onDelete={handleEventDelete} // pass the handleDelete function

//         />
//       )}
//     </RootLayout>
//   );
// };

// export default Scheduler;




// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import RootLayout from "../Layout/RootLayout";
// import Button from "../common/Button";
// import AddEventModal from "../ModalBox/AddEventModal";
// import EventDetailsModal from "../ModalBox/EventDetailsModal";
// import { toast } from "react-toastify";
// import { postAPI, getAPI, patchAPI, deleteAPI } from "../network";

// const localizer = momentLocalizer(moment);
// const toastObj = { position: "top-right" };

// const Scheduler = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const eventData = await getAPI("/getSchedule");
//       const events = eventData.map((event) => ({
//         schedule_id: event.schedule_id,
//         candidate_id: event.candidate_id,
//         title: `${event.title}`,
//         candidate_name: event.candidate_name,
//         job_id: event.job_id,
//         start: new Date(event.start_time),
//         end: new Date(event.end_time),
//       }));
//       setEvents(events);
//     } catch (error) {
//       toast.error("Failed to fetch events. Please try again.", toastObj);
//     }
//   };

//   const handleEventAdded = async (event) => {
//     const startDate = event.start._d ? event.start._d : event.start;
//     const endDate = event.end._d ? event.end._d : event.end;

//     const formdata = {
//       id: event.schedule_id,
//       candidate_id: event.candidate_id,
//       candidate_name: event.candidate_name,
//       job_id: event.job_id,
//       title: event.title,
//       start_time: new Date(startDate),
//       end_time: new Date(endDate),
//     };

//     try {
//       await postAPI("/addSchedule", formdata);
//       closeAddEventModal();
//       fetchEvents();
//     } catch (error) {
//       toast.error("Failed to add event. Please try again.", toastObj);
//     }
//   };

//   const handleEventSelect = (event) => {
//     setSelectedEvent(event);
//     setEventDetailsOpen(true);
//   };

//   const closeAddEventModal = () => {
//     setModalOpen(false);
//   };

//   const closeEventDetailsModal = () => {
//     setEventDetailsOpen(false);
//     setSelectedEvent(null);
//   };

//   const handleEventUpdate = async (updatedEvent) => {
//     const formdata = {
//       schedule_id: updatedEvent.schedule_id,
//       candidate_id: updatedEvent.candidate_id,
//       candidate_name: updatedEvent.candidate_name,
//       job_id: updatedEvent.job_id,
//       title: updatedEvent.title,
//       start_time: updatedEvent.start,
//       end_time: updatedEvent.end,
//     };

//     try {
//       const response = await patchAPI("/updateSchedule/:id", formdata);
//       console.log("Update response:", response);
//       setEvents(events.map(event => (event.schedule_id === updatedEvent.schedule_id ? updatedEvent : event)));
//       fetchEvents(); // Refresh the events list
//       closeEventDetailsModal();
//     } catch (error) {
//       toast.error("Failed to update event. Please try again.", toastObj);
//     }
//   };

//   const handleEventDelete = (scheduleId) => {
//     setEvents(events.filter(event => event.schedule_id !== scheduleId));
//   };

//   // Event Prop Getter to conditionally set event color
//   const eventPropGetter = (event) => {
//     const now = new Date();
//     const eventEnd = new Date(event.end);
//     const eventColor = eventEnd < now ? 'red' : 'green';

//     return {
//       style: {
//         backgroundColor: eventColor,
//       },
//     };
//   };

//   return (
//     <RootLayout>
//       <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
//         <div className="flex justify-center mt-3">
//           <div className="w-5/12">
//             <div onClick={() => setModalOpen(true)}>
//               <Button title={"Add Event"} />
//             </div>
//           </div>
//         </div>
//         <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ flex: 1 }}
//             onSelectEvent={handleEventSelect}
//             eventPropGetter={eventPropGetter} // Pass the eventPropGetter function here
//           />
//         </div>
//       </div>
//       {modalOpen && (
//         <AddEventModal
//           isOpen={modalOpen}
//           closeModal={closeAddEventModal}
//           onEventAdded={handleEventAdded}
//         />
//       )}
//       {eventDetailsOpen && (
//         <EventDetailsModal
//           isOpen={eventDetailsOpen}
//           closeModal={closeEventDetailsModal}
//           event={selectedEvent}
//           onUpdate={handleEventUpdate}
//           onDelete={handleEventDelete} // pass the handleDelete function
//         />
//       )}
//     </RootLayout>
//   );
// };

// export default Scheduler;



// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import RootLayout from "../Layout/RootLayout";
// import Button from "../common/Button";
// import AddEventModal from "../ModalBox/AddEventModal";
// import EventDetailsModal from "../ModalBox/EventDetailsModal";
// import { toast } from "react-toastify";
// import { postAPI, getAPI, patchAPI, deleteAPI } from "../network";

// const localizer = momentLocalizer(moment);
// const toastObj = { position: "top-right" };
// const DnDCalendar = withDragAndDrop(Calendar);

// const Scheduler = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const eventData = await getAPI("/getSchedule");
//       const events = eventData.map((event) => ({
//         schedule_id: event.schedule_id,
//         candidate_id: event.candidate_id,
//         title: `${event.title}`,
//         candidate_name: event.candidate_name,
//         job_id: event.job_id,
//         start: new Date(event.start_time),
//         end: new Date(event.end_time),
//       }));
//       setEvents(events);
//     } catch (error) {
//       toast.error("Failed to fetch events. Please try again.", toastObj);
//     }
//   };

//   const handleEventAdded = async (event) => {
//     const startDate = event.start._d ? event.start._d : event.start;
//     const endDate = event.end._d ? event.end._d : event.end;

//     const formdata = {
//       id: event.schedule_id,
//       candidate_id: event.candidate_id,
//       candidate_name: event.candidate_name,
//       job_id: event.job_id,
//       title: event.title,
//       start_time: new Date(startDate),
//       end_time: new Date(endDate),
//     };

//     try {
//       await postAPI("/addSchedule", formdata);
//       closeAddEventModal();
//       fetchEvents();
//     } catch (error) {
//       toast.error("Failed to add event. Please try again.", toastObj);
//     }
//   };

//   const handleEventSelect = (event) => {
//     setSelectedEvent(event);
//     setEventDetailsOpen(true);
//   };

//   const closeAddEventModal = () => {
//     setModalOpen(false);
//   };

//   const closeEventDetailsModal = () => {
//     setEventDetailsOpen(false);
//     setSelectedEvent(null);
//   };

//   const handleEventUpdate = async (updatedEvent) => {
//     const formdata = {
//       schedule_id: updatedEvent.schedule_id,
//       candidate_id: updatedEvent.candidate_id,
//       candidate_name: updatedEvent.candidate_name,
//       job_id: updatedEvent.job_id,
//       title: updatedEvent.title,
//       start_time: updatedEvent.start,
//       end_time: updatedEvent.end,
//     };

//     try {
//       const response = await patchAPI("/updateSchedule/:id", formdata);
//       console.log("Update response:", response);
//       setEvents(events.map(event => (event.schedule_id === updatedEvent.schedule_id ? updatedEvent : event)));
//       fetchEvents(); // Refresh the events list
//       closeEventDetailsModal();
//     } catch (error) {
//       toast.error("Failed to update event. Please try again.", toastObj);
//     }
//   };

//   const handleEventDelete = (scheduleId) => {
//     setEvents(events.filter(event => event.schedule_id !== scheduleId));
//   };

//   // Event Prop Getter to conditionally set event color
//   const eventPropGetter = (event) => {
//     const now = new Date();
//     const eventEnd = new Date(event.end);
//     const eventColor = eventEnd < now ? 'red' : 'green';

//     return {
//       style: {
//         backgroundColor: eventColor,
//       },
//     };
//   };

//   // Handle event drag-and-drop
//   const handleEventDrop = async ({ event, start, end }) => {
//     const duration = moment(event.end).diff(moment(event.start));
//     const updatedEvent = {
//       ...event,
//       start: new Date(start),
//       end: new Date(start.getTime() + duration),
//     };
//     handleEventUpdate(updatedEvent);
//   };

//   return (
//     <RootLayout>
//       <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
//         <div className="flex justify-center mt-3">
//           <div className="w-5/12">
//             <div onClick={() => setModalOpen(true)}>
//               <Button title={"Add Event"} />
//             </div>
//           </div>
//         </div>
//         <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
//           <DnDCalendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ flex: 1 }}
//             onEventDrop={handleEventDrop}
//             onSelectEvent={handleEventSelect}
//             eventPropGetter={eventPropGetter} // Pass the eventPropGetter function here
//           />
//         </div>
//       </div>
//       {modalOpen && (
//         <AddEventModal
//           isOpen={modalOpen}
//           closeModal={closeAddEventModal}
//           onEventAdded={handleEventAdded}
//         />
//       )}
//       {eventDetailsOpen && (
//         <EventDetailsModal
//           isOpen={eventDetailsOpen}
//           closeModal={closeEventDetailsModal}
//           event={selectedEvent}
//           onUpdate={handleEventUpdate}
//           onDelete={handleEventDelete} // pass the handleDelete function
//         />
//       )}
//     </RootLayout>
//   );
// };

// export default Scheduler;





import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import RootLayout from "../Layout/RootLayout";
import Button from "../common/Button";
import AddEventModal from "../ModalBox/AddEventModal";
import EventDetailsModal from "../ModalBox/EventDetailsModal";
import { toast } from "react-toastify";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../network";

const localizer = momentLocalizer(moment);
const toastObj = { position: "top-right" };
const DnDCalendar = withDragAndDrop(Calendar);

const Scheduler = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventData = await getAPI("/getSchedule");
      const events = eventData.map((event) => ({
        schedule_id: event.schedule_id,
        candidate_id: event.candidate_id,
        title: `${event.title} (${event.candidate_name})`,
        candidate_name: event.candidate_name,
        job_id: event.job_id,
        start: new Date(event.start_time),
        end: new Date(event.end_time),
      }));
      setEvents(events);
    } catch (error) {
      toast.error("Failed to fetch events. Please try again.", toastObj);
    }
  };

  const handleEventAdded = async (event) => {
    const startDate = event.start._d ? event.start._d : event.start;
    const endDate = event.end._d ? event.end._d : event.end;

    const formdata = {
      id: event.schedule_id,
      candidate_id: event.candidate_id,
      candidate_name: event.candidate_name,
      job_id: event.job_id,
      title: event.title,
      start_time: new Date(startDate),
      end_time: new Date(endDate),
    };

    try {
      await postAPI("/addSchedule", formdata);
      closeAddEventModal();
      fetchEvents();
    } catch (error) {
      toast.error("Failed to add event. Please try again.", toastObj);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  };

  const closeAddEventModal = () => {
    setModalOpen(false);
  };

  const closeEventDetailsModal = () => {
    setEventDetailsOpen(false);
    setSelectedEvent(null);
  };

  const handleEventUpdate = async (updatedEvent) => {
    const formdata = {
      schedule_id: updatedEvent.schedule_id,
      candidate_id: updatedEvent.candidate_id,
      candidate_name: updatedEvent.candidate_name,
      job_id: updatedEvent.job_id,
      title: updatedEvent.title.replace(` (${updatedEvent.candidate_name})`, ''),
      start_time: updatedEvent.start,
      end_time: updatedEvent.end,
    };

    try {
      await patchAPI(`/updateSchedule/${updatedEvent.schedule_id}`, formdata);
      fetchEvents();
      closeEventDetailsModal();
    } catch (error) {
      toast.error("Failed to update event. Please try again.", toastObj);
    }
  };

  const handleEventDelete = async (scheduleId) => {
    try {
      await deleteAPI(`/deleteSchedule/${scheduleId}`);
      setEvents(events.filter((event) => event.schedule_id !== scheduleId));
    } catch (error) {
      toast.error("Failed to delete event. Please try again.", toastObj);
    }
  };

  const eventPropGetter = (event) => {
    const now = new Date();
    const eventEnd = new Date(event.end);
    const eventColor = eventEnd < now ? "red" : "green";

    return {
      style: {
        backgroundColor: eventColor,
      },
    };
  };

  const handleEventDrop = async ({ event, start, end }) => {
    const duration = moment(event.end).diff(moment(event.start));
    const updatedEvent = {
      ...event,
      start: new Date(start),
      end: new Date(start.getTime() + duration),
    };
    handleEventUpdate(updatedEvent);
  };

  const handleEventResize = async ({ event, start, end }) => {
    const updatedEvent = {
      ...event,
      start: new Date(start),
      end: new Date(end),
    };
    handleEventUpdate(updatedEvent);
  };

  return (
    <RootLayout>
      <div style={{ zIndex: -1, position: "absolute", width: "80%" }}>
        <div className="flex justify-center mt-3">
          <div className="w-5/12">
            <div onClick={() => setModalOpen(true)}>
              <Button title={"Add Event"} />
            </div>
          </div>
        </div>
        <div style={{ height: 500, marginTop: "5rem", zIndex: -1 }}>
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ flex: 1 }}
            onEventDrop={handleEventDrop}
            onSelectEvent={handleEventSelect}
            eventPropGetter={eventPropGetter}
            onEventResize={handleEventResize}
          />
        </div>
      </div>
      {modalOpen && (
        <AddEventModal
          isOpen={modalOpen}
          closeModal={closeAddEventModal}
          onEventAdded={handleEventAdded}
        />
      )}
      {eventDetailsOpen && (
        <EventDetailsModal
          isOpen={eventDetailsOpen}
          closeModal={closeEventDetailsModal}
          event={selectedEvent}
          onUpdate={handleEventUpdate}
          onDelete={handleEventDelete}
        />
      )}
    </RootLayout>
  );
};

export default Scheduler;
