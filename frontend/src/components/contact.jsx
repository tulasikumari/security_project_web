import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createcontact } from "../apis/Api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({}); // Initialize as an empty object

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      setFormData(JSON.parse(storedUserData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    console.log("Form Data:", data);

    try {
      const response = await createcontact(data);
      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        // Optionally update local storage or any other logic based on the response
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {/* ... (your styling code) */}
        <h2>Contact Us</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <iframe
              title="Google Maps"
              width="100%"
              height="400"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=kathmandu+(home%20docor)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.maps.ie/population/">Population mapping</a>
            </iframe>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username" // Corrected to "name"
                  value={formData.username || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message || ""}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
