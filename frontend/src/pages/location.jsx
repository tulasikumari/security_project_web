import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LocationEntry = () => {
  // State to manage form input values
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // Use useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform any necessary actions with the collected data
    // For example, you might want to send this information to a server

    // After processing, navigate the user to the homepage
    navigate("/homepage");
  };

  return (
    <>
      <style>
        {`
          /* LocationEntry.css */
          .login-container {
            max-width: 300px;
            margin: auto;
            padding: 20px;
            margin-top: 40px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .input-group {
            margin-bottom: 15px;
          }

          .small-input {
            width: 100%;
          }
        `}
      </style>
      <div className="login-container">
        <h2>Location Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ""))}
              className="small-input"
              placeholder="Enter phone number (numbers only)"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default LocationEntry;
