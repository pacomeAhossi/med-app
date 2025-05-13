import React, { useEffect, useState } from 'react';
import './GiveReviews.css';

function GiveReviews() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ name: '', review: '', rating: '' });
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem("doctorReviews");
    return stored ? JSON.parse(stored) : {};
  });
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const allAppointments = [];
    const doctorNames = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("appointments_")) {
        const data = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(data) && data.length > 0) {
          const doctor = data[0].doctor;
          if (doctor) {
            doctorNames.push(doctor.name);
            allAppointments.push({ doctor, key });
          }
        }
      }
    }

    // Nettoyage des reviews obsolètes
    const oldReviews = JSON.parse(localStorage.getItem("doctorReviews")) || {};
    const filteredReviews = {};
    for (const key of Object.keys(oldReviews)) {
      if (doctorNames.includes(key)) {
        filteredReviews[key] = oldReviews[key];
      }
    }
    setReviews(filteredReviews);
    localStorage.setItem("doctorReviews", JSON.stringify(filteredReviews));

    setAppointments(allAppointments);
  }, []);

  const openReviewModal = (doctorName) => {
    setSelectedDoctorId(doctorName);
    setFormData({ name: '', review: '', rating: '' });
    setShowWarning(false);

    const modalElement = document.getElementById("reviewModal");
    if (modalElement && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("Bootstrap modal could not be opened.");
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating) {
      const newReviews = { ...reviews, [selectedDoctorId]: formData };
      setReviews(newReviews);
      localStorage.setItem("doctorReviews", JSON.stringify(newReviews));

      const modalElement = document.getElementById("reviewModal");
      let modal = window.bootstrap.Modal.getInstance(modalElement);
      if (!modal) {
        modal = new window.bootstrap.Modal(modalElement);
      }
      modal.hide();
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="container mg-top">
      <h2 className="mb-4 text-center">Leave a Review for Your Doctors</h2>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide feedback</th>
              <th> Review Given</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => {
              const doctorId = item.doctor.name;
              const review = reviews[doctorId];

              return (
                <tr key={doctorId + index}>
                  <td>{index + 1}</td>
                  <td>{item.doctor.name}</td>
                  <td>{item.doctor.speciality}</td>
                  <td>
                    <button
                      className={`btn btn-primary ${review ? 'disabled' : ''}`}
                      onClick={() => openReviewModal(doctorId)}
                      disabled={!!review}
                    >
                      {review ? "Review Submitted" : "Click Here"}
                    </button>
                  </td>
                  <td>
                    {review && (
                      <div className="card shadow-sm border-0">
                        <div className="card-body p-3">
                          <p className="card-text text-muted" style={{ whiteSpace: 'pre-line' }}>
                            {review.review}
                          </p>
                          <div className="mb-2">
                            <div className="d-flex justify-content-center align-items-center">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span
                                  key={i}
                                  style={{
                                    color: i < review.rating ? '#ffc107' : '#e4e5e9',
                                    fontSize: '1.25rem',
                                    marginRight: '4px'
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="reviewModal"
        tabIndex="-1"
        aria-labelledby="reviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={handleSubmit} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reviewModalLabel">Submit Your Review</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {showWarning && (
                <div className="alert alert-danger p-2">
                  All fields are required.
                </div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control w-100"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="review"
                  className="form-control w-100"
                  placeholder="Write your review"
                  value={formData.review}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="rating"
                  className="form-control w-100"
                  placeholder="Rating (1–5)"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GiveReviews;
