import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import DoctorCard from "./Components/DoctorCard/DoctorCard";
import AppointmentForm from "./Components/AppointmentForm/AppointmentForm";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import { NotificationProvider } from "./Components/Notification/NotificationContext";
import GiveReviews from "./Components/GiveReviews/GiveReviews";
import ProfileForm from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";
import Services from "./Components/Services/Services";

function App() {
    const [notificationTrigger, setNotificationTrigger] = useState(0);

  return (
    <div className="App">
        {/* <Router>
            <Notification>
                <Routes>
                    <Route path="/" element={<Landing_Page />} />
                    <Route path="/signup" element={<Sign_Up />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/instant-consultation" element={<InstantConsultation />} />
                    <Route path="/doctor-card" element={<DoctorCard />} />
                    <Route path="/appt-form" element={<AppointmentForm />} />
                    <Route path="/booking-consultation" element={<BookingConsultation />} />
                </Routes>
            </Notification>
            
        </Router> */}
        <NotificationProvider>
            <Router>
                <Notification>
                    <Routes>
                        <Route path="/" element={<Landing_Page />} />
                        <Route path="/signup" element={<Sign_Up />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<ProfileForm />} />
                        <Route path="/services" element={<Services />} />
                        {/* <Route path="/instant-consultation" element={<InstantConsultation />} /> */}
                        <Route path="/doctor-card" element={<DoctorCard />} />
                        <Route path="/appt-form" element={<AppointmentForm />} />
                        {/* <Route path="/search/doctors" element={<BookingConsultation />} /> */}
                        <Route path="/booking-consultation" element={<BookingConsultation />} />
                        <Route path="/reviews" element={<GiveReviews />} />
                        <Route path="/reports" element={<ReportsLayout />} />
                    </Routes>
                </Notification>
            </Router>
        </NotificationProvider>
    </div>
  );
}

export default App;
