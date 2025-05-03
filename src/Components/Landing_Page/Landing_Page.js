import React from "react"; 
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./LandingPage.css"; 

// Defining the Function component Landing_Page
const Landing_Page = () => {
  return (
    <section className="hero-section"> 
        <div>
            <div data-aos="fade-up" className="flex-hero">
            
                <h1>
                    Your Health<br/>

                    <span className="text-gradient">
                        
                        Our Responsibility
                    </span>
                </h1>
                <div class="blob-cont"> 
                    <div className="blue blob"></div> 
                </div>
                <div class="blob-cont"> 
                    <div className="blue1 blob"></div>
                </div>
                <h4>
                    "Embrace the art of self-care, for a healthy mind and body forge the foundation of a vibrant life.
                    Wellness is not just a destination; it's a journey of mindful choices and daily transformations. 
                    Nurture your health with love, and watch it bloom into a beacon of joy and vitality."
                </h4>
                <a href="#services"> 
                    <button className="button">Get Started</button> 
                </a>
            </div>
        </div>
    </section>
  );
};

export default Landing_Page; // Exporting the Landing_Page component to be used in other parts of the application