import React, { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
import './ReportsLayout.css';

function ReportsLayout() {
  const [appointments, setAppointments] = useState([]);
  const [selectedReport, setSelectedReport] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const allAppointments = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("appointments_")) {
        const data = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(data) && data.length > 0) {
          const doctor = data[0].doctor;
          const report = data[0].report || "No report available"; // exemple
          allAppointments.push({ doctor, report });
        }
      }
    }

    setAppointments(allAppointments);
  }, []);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);

    const modalElement = document.getElementById("reportModal");
    if (modalElement && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const handleDownloadPDF = (report, doctorName) => {
    const doc = new jsPDF();
  
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Medical Consultation Report", 20, 20);
  
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Doctor: ${doctorName}`, 20, 35);
    doc.text("Report:", 20, 50);
  
    // Découpe automatique du texte long
    const splitText = doc.splitTextToSize(report, 170);
    doc.text(splitText, 20, 60);
  
    doc.save(`${doctorName.replace(/\s+/g, "_")}_report.pdf`);
  };

  return (
    <div className="container mg-top">
      <h2 className="mb-4 text-center">Reports</h2>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr key={item.doctor.name + index}>
                <td>{index + 1}</td>
                <td>{item.doctor.name}</td>
                <td>{item.doctor.speciality}</td>
                <td>
                <a
                    href="/report/patient_report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                >
                    View Report
                </a>
                </td>
                <td>
                    <a 
                        href="/report/patient_report.pdf" 
                        download 
                        className="btn btn-primary"
                    >
                        Download Report
                    </a>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="reportModal"
        tabIndex="-1"
        aria-labelledby="reportModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reportModalLabel">Consultation Report</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p style={{ whiteSpace: 'pre-line' }}>{selectedReport}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsLayout;
