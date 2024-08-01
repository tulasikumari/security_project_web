import React, { useState } from "react";
import { toast } from "react-toastify";
import { VerifyOtp } from "../apis/Api"; // Import the VerifyOtp API function

const OtpVerificationForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Initiate the OTP verification process
      const response = await VerifyOtp({ email, otp });

      if (response.success) {
        toast.success("OTP verification successful.");
        setMessage("OTP verification successful.");
        // Perform further actions after successful OTP verification
      } else {
        toast.error("Invalid OTP. Please try again.");
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="otp-verification-container">
      <form onSubmit={handleSubmit} className="otp-verification-form">
        <div className="form-group">
          <h2>OTP Verification</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify OTP</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default OtpVerificationForm;
