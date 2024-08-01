import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createcontact } from "../apis/Api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({});

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
        setFormData({}); // Clear the form fields
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  return (
    <>
      <style>
        {`
        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 95vh;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1050px;
          height: 520px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0px 0px 20px 0px;
          margin-top: 50px;
        }

        .form-container {
          width: 100%;
          max-width: 500px;
          padding: 50px;
          text-align: center;
        }

        .form-container h2 {
          margin-bottom: 50px;
          font-size: 2.5em;
        }

        .form-container label {
          display: block;
          margin-bottom: 5px;
          text-align: left;
        }

        .form-container input,
        .form-container textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .form-container .btn-dark {
          background-color: #000;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 5px;
          width: 100%;
        }

        .form-container .btn-dark:hover {
          background-color: #333;
        }
        `}
      </style>
      <Navbar />

      <div className="box">
        <div className="login-container">
          <div className="form-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Your Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Your Fullname"
                value={formData.username || ""}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Enter Your Messages"
                value={formData.message || ""}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
