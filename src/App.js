import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import DoctorCard from "./Components/DoctorCard/DoctorCard";
import AppointmentForm from "./Components/AppointmentForm/AppointmentForm";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";

function App() {
  return (
    <div className="App">
        <Router>
            <Notification>
                <Routes>
                    <Route path="/" element={<Landing_Page />} />
                    <Route path="/signup" element={<Sign_Up />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/instant-consultation" element={<InstantConsultation />} /> */}
                    <Route path="/doctor-card" element={<DoctorCard />} />
                    <Route path="/appt-form" element={<AppointmentForm />} />
                    <Route path="/booking-consultation" element={<BookingConsultation />} />
                </Routes>
            </Notification>
            
        </Router>
    </div>
  );
}

export default App;
