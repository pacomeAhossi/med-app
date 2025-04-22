import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Landing_Page />} />
                <Route path="/sign-up" element={<Sign_Up />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
