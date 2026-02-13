import { useState } from "react";
import axios from "axios";
import "../styles/Volunteer.css";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    availability: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/volunteers`,
        formData
      );

      alert("Volunteer registered successfully!");

      setFormData({
        name: "",
        email: "",
        skills: "",
        availability: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };
  return (
    <div className="volunteer-registration-page">
      <div className="form-container">
        <h2 className="form-title">Volunteer Registration</h2>
        <p className="form-subtitle">Join our community and make a difference in patients' lives</p>
        
        <form onSubmit={handleSubmit} className="volunteer-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input className="form-input" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input className="form-input" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="skills" className="form-label">Skills</label>
            <input className="form-input" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="availability" className="form-label">Availability</label>
            <input className="form-input" name="availability" placeholder="Availability" value={formData.availability} onChange={handleChange} required />
          </div>
          
          <button type="submit" className="form-submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Volunteer;