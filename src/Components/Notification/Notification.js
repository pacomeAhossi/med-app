import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    console.log(storedDoctorData);
    const storedAppointmentData = JSON.parse(localStorage.getItem('lastAppointmentData'));
    console.log(storedAppointmentData);

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      console.log('isLoggedIn',isLoggedIn);
    }

    if (storedDoctorData) {
        setDoctorData(storedDoctorData);
    }
  
    if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
    }

    // Simuler un délai de chargement
    setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

    const formatTime = (timeStr) => {
        if (!timeStr) return 'Not specified';
        const [hour, minute] = timeStr.split(':');
        const date = new Date();
        date.setHours(hour, minute);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not specified';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar ></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {/* {isLoggedIn && appointmentData && (
        <>
          <div className="notification-card">
            <h3>📅 Appointment Confirmed</h3>
            <p><strong>Doctor:</strong> {doctorData.name}</p>
            <p><strong>Speciality:</strong> {doctorData.speciality} years</p>
            <p><strong>Name:</strong> {appointmentData.name}</p>
            <p><strong>Phone Number:</strong> {appointmentData.phoneNumber}</p>
            <p><strong>Date of Appointment:</strong> {formatDate(appointmentData.appointmentDate)}</p>
            <p><strong>Time Slot:</strong> {formatTime(appointmentData.appointmentTime)}</p>
          </div>
        </>
      )} */}
      {isLoggedIn && appointmentData && (
        <>
          <div className="notification-card mt-4 p-4 border rounded">
            {isLoading ? (
              // Placeholder animé de Bootstrap pendant le chargement
              <div className="placeholder-glow">
                <h3 className="placeholder col-6"></h3>
                <p className="placeholder col-7"></p>
                <p className="placeholder col-5"></p>
                <p className="placeholder col-8"></p>
                <p className="placeholder col-4"></p>
                <p className="placeholder col-9"></p>
                <p className="placeholder col-6"></p>
              </div>
            ) : (
              // Contenu normal quand chargé
              appointmentData && doctorData && (
                <>
                  <h3>📅 Appointment Confirmed</h3>
                  <p><strong>Doctor:</strong> {doctorData.name}</p>
                  <p><strong>Speciality:</strong> {doctorData.speciality} years</p>
                  <p><strong>Name:</strong> {appointmentData.name}</p>
                  <p><strong>Phone Number:</strong> {appointmentData.phoneNumber}</p>
                  <p><strong>Date of Appointment:</strong> {formatDate(appointmentData.appointmentDate)}</p>
                  <p><strong>Time Slot:</strong> {formatTime(appointmentData.appointmentTime)}</p>
                </>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;