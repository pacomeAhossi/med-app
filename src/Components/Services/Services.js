import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Services.css';

import InstantConsultationImg from '../../assets/illustrations/instant-consultation.svg';
import BookAppointmentImg from '../../assets/illustrations/book-appointment.svg';
import SelfCheckupImg from '../../assets/illustrations/self-checkup.jpg';
import HealthTipsImg from '../../assets/illustrations/health-tips-guidance.svg';

const Services = () => {
  const navigate = useNavigate();

//   const services = [
//     {
//       link: 'search/doctors',
//       title: 'Instant Consultation',
//       description: 'Connect instantly with certified doctors for health concerns.',
//       image: InstantConsultationImg,
//     },
//     {
//       link: 'book-appointment',
//       title: 'Book an Appointment',
//       description: 'Schedule visits with healthcare professionals at your convenience.',
//       image: BookAppointmentImg,
//     },
//     {
//       link: 'self-checkup',
//       title: 'Self Checkup',
//       description: 'Perform quick and easy self-assessments using smart tools.',
//       image: SelfCheckupImg,
//     },
//     {
//       link: 'health-tips-guidance',
//       title: 'Health Tips & Guidance',
//       description: 'Get expert tips and daily health advice tailored to your needs.',
//       image: HealthTipsImg,
//     },
//   ];
const services = [
    {
      title: "Instant Consultation",
      description: "Connect with certified doctors instantly for any health concerns.",
      image: InstantConsultationImg,
      link: "/instant-consultation"
    },
    {
      title: "Book an Appointment",
      description: "Schedule meetings with health professionals at your convenience.",
      image: BookAppointmentImg,
      link: "/booking-consultation"
    },
    {
      title: "Self Checkup",
      description: "Perform health checkups from the comfort of your home.",
      image: SelfCheckupImg,
      link: "/self-checkup"
    },
    {
      title: "Health Tips & Guidance",
      description: "Stay informed with expert advice and wellness tips.",
      image: HealthTipsImg,
      link: "/health-tips"
    }
  ];

  const handleClick = (link) => {
    navigate(`/${link}`);
  };

//   return (
//     <div className="services-container">
//       <h2 className="services-title">Best Services</h2>
//       <p className='sub-text text-muted'>Love yourself enough to live a healthy lifestyle.</p>
//       <div className="services-grid">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="service-card"
//             onClick={() => handleClick(service.link)}
//           >
//             <img
//               src={service.image}
//               alt={service.title}
//               loading="lazy"
//               className="service-image"
//             />
//             <h3 className="service-title">{service.title}</h3>
//             <p className="service-description">{service.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );


return (
    <section className="services-section">
      <h2 className="section-title">Best Services</h2>
      <p className='sub-text text-muted'>Love yourself enough to live a healthy lifestyle.</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <Link to={service.link} key={index} className="service-card">
            <img src={service.image} alt={service.title} loading="lazy" />
            <h5>{service.title}</h5>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
