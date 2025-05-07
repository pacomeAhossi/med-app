import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Sign_Up.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from "../../config";

const Sign_Up = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const register = async (e) => {
    e.preventDefault();
    setErrors({}); // Réinitialise les erreurs

    // Validation côté client : mots de passe identiques
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", formData.name);
        sessionStorage.setItem("phone", formData.phone);
        sessionStorage.setItem("email", formData.email);
        navigate("/", { replace: true });
      } else if (json.error) {
        const fieldErrors = {};
        json.error.forEach(error => {
          fieldErrors[error.param] = error.msg;
        });
        setErrors(fieldErrors);
      } else if (json.error?.msg) {
        setErrors({ general: json.error.msg });
      }
    } catch (err) {
      setErrors({ general: "Server error. Please try again later." });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create an Account</h2>
        <p className="signup-subtext">
          Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </p>

        {errors.general && <div className="error-message">{errors.general}</div>}

        <form onSubmit={register} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input-icon">
              <i className="fa fa-user"></i>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="form-control"
              />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div className="input-icon">
              <i className="fa fa-phone"></i>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-icon">
              <i className="fa fa-envelope"></i>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="form-control"
              />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon password-wrapper">
              <i className="fa fa-lock"></i>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="form-control"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-icon password-wrapper">
              <i className="fa fa-lock"></i>
              <input
                name="confirmPassword"
                type={showPasswordConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="form-control"
              />
              <FontAwesomeIcon
                icon={showPasswordConfirm ? faEyeSlash : faEye}
                className="toggle-password"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: ''
                });
                setErrors({});
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign_Up;