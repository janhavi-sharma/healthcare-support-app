import { useState } from "react";
import axios from "axios";
import "../styles/Support.css";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/support`,
        formData
      );
      alert("Support request submitted successfully!");

      setFormData({
        name: "",
        email: "",
        issue: "",
        description: ""
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="patient-support-page">
      <div className="form-container-support">
        <h2 className="form-title-support">Request Healthcare Support</h2>
        <p className="form-subtitle-support">Fill out the form below and our team will get back to you shortly!</p>
      
        <form onSubmit={handleSubmit} className="support-form">
          <div className="form-group-support">
            <label htmlFor="name" className="form-label-support">Name</label>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-input-support" required />
          </div>

          <div className="form-group-support">
            <label htmlFor="email" className="form-label-support">Email</label>
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-input-support" required />
          </div>

          <div className="form-group-support">
            <label htmlFor="issue" className="form-label-support">Medical Condition</label>
            <input name="issue" placeholder="List your medical condition(s)" value={formData.issue} onChange={handleChange} className="form-input-support" required/>
          </div>  

          <div className="form-group-support">
            <label htmlFor="description" className="form-label-support">Description</label>
            <textarea
              name="description"
              className="form-textarea-support"
              placeholder="Describe your issue"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="form-submit-button-support">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Support;