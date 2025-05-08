import React, { useEffect, useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContext } from '../Notification/NotificationContext';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
    const { triggerNotificationRefresh }  = useContext(NotificationContext);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);


  const doctorKey = `appointments_${name.replace(/\s/g, '_')}`;

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem(doctorKey)) || [];
    setAppointments(savedAppointments);
  }, [doctorKey]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);

    if (updatedAppointments.length === 0) {
      localStorage.removeItem(doctorKey);
    } else {
      localStorage.setItem(doctorKey, JSON.stringify(updatedAppointments));
    }
    triggerNotificationRefresh();
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
      doctor:{
        name,
        speciality,
        experience,
        ratings
      }
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);

    localStorage.setItem(doctorKey, JSON.stringify(updatedAppointments));

    triggerNotificationRefresh();
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return 'Not specified';
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? "Cancel Appointment" : "Book Appointment"}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Appointment Date: {appointment.appointmentDate}</p>
                      <p>Appointment Slot: {formatTime(appointment.appointmentTime)}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;
