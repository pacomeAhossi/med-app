import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";



const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");

      if (storedemail) {
            setIsLoggedIn(true);
            const rawUsername = storedemail.split("@")[0];
            const extratedUsername = rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1).toLocaleLowerCase();
            setUsername(extratedUsername);
          }
        }, []);
  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
        StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i></Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
         <Link to="/reviews">Reviews</Link>
        </li>
        {isLoggedIn ? (
            <>
                <li
                    className="link position-relative"
                    onMouseEnter={handleDropdown}
                    onMouseLeave={handleDropdown}
                    style={{ cursor: 'pointer' }}
                >
                    Welcome, {username}
                    {showDropdown && (
                        <div
                            className="card shadow-sm position-absolute"
                            style={{
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                minWidth: '180px',
                                minHeight: '100px'
                            }}
                        >
                            <div className="card-body p-2">
                                <Link to="/profile" className="dropdown-item text-dark">
                                <i className="fa fa-user me-2"></i> Your Profile
                                </Link>
                                <Link to="/reports" className="dropdown-item text-dark">
                                    <i className="fa fa-file-text-o me-2"></i> Your Reports
                                </Link>
                            </div>
                        </div>
                    )}
                </li>
                <li className="link">
                <button className="btn2" onClick={handleLogout}>
                    Logout
                </button>
                </li>
            </>
        ) : (
            <>
                <li className="link">
                <Link to="/signup">
                    <button className="btn1">Sign Up</button>
                </Link>
                </li>
                <li className="link">
                <Link to="/login">
                    <button className="btn1">Login</button>
                </Link>
                </li>
            </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

