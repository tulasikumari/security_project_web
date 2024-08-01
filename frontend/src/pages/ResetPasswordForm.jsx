import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgetpassword } from "../apis/Api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem('email', email);
      console.log("Email before API call:", email);

      const response = await forgetpassword({ email });

      navigate('/changepassword');
      // ... rest of the code ...
    } catch (error) {
      console.error(error);
      toast.error("Check your Email.");
      setMessage("Check your Email.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      // Your OTP verification logic here

      // Assuming OTP verification is successful, navigate to ChangePassword component
      navigate('/changepassword');
    } catch (error) {
      console.error(error);
      toast.error("Check your email. Please try again.");
      setMessage("Password changed.");
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
            height: 100vh;
          }

          .reset-password-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 1050px;
            height: 520px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 0px 20px 0px;
            margin-top: 50px;
          }

          .image-container {
            width: 50%;
            height: 100%;
            overflow: hidden;
            border-radius: -50px;
            padding: 20px;
          }

          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
          }

          .form-container {
            width: 50%;
            height: 100%;
            padding: 50px;
          }

          .form-container h2 {
            margin-bottom: 50px;
            margin: 30px auto;
            font-size: 2.5em;
          }

          .form-container label {
            display: block;
            margin-bottom: 5px;
          }

          .form-container input {
            margin-bottom: 20px;
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .form-container button {
            width: 100%;
            padding: 10px;
            background-color: black;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .form-container button:hover {
            background-color: #333;
          }

          .verify-otp-form {
            margin-top: 20px;
          }
        `}
      </style>
      <Navbar />
      <div className="box">
        <div className="reset-password-container">
         
          <div className="form-container">
            <h2>Password Reset</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Send OTP</button>
              {message && <p>{message}</p>}
            </form>

            {message && (
              <form onSubmit={handleVerifyOtp} className="verify-otp-form">
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit">Verify OTP</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
