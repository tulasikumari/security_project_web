import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { createUserApi } from "../apis/Api";
import Navbar from "../components/Navbar";
import register from "../images/register.jpg";
import zxcvbn from 'zxcvbn';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: "None", color: "black", percent: 0 });

  const changeFirstname = (e) => setFirstName(e.target.value);
  const changeLastname = (e) => setLastName(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };
  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const checkPasswordStrength = (password) => {
    // Check if the password length is within the specified range
    if (password.length < 8 || password.length > 12) {
        return { strength: "Must be 8 to 12character", color: "b;", percent: 0 };
    }

    // Check for complexity: uppercase, lowercase, numbers, and special characters
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = "";
    let color = "";
    let percent = 0;

    // Calculate the complexity level based on the presence of character types
    const complexity = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

    // Determine strength based on the complexity
    if (complexity === 0) {
        strength = "Weak";
        color = "red";
        percent = 25;
    } else if (complexity === 1 || complexity === 2) {
        strength = "Medium";
        color = "orange";
        percent = 50;
    } else if (complexity === 3) {
        strength = "Strong";
        color = "yellow";
        percent = 75;
    } else if (complexity === 4) {
        strength = "Very Strong";
        color = "green";
        percent = 100;
    }

    return { strength, color, percent };
};
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      toast.error("Email must contain @gmail.com");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirmation password don't match");
      return;
    }

    if (passwordStrength.strength === "Weak" || passwordStrength.strength === "Too Short") {
      toast.error("Password must be 8 character and strength must be Medium, Strong, or Very Strong");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  const { strength, color, percent } = passwordStrength;

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
          .login-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 5px;
            width: 1050px;
            height: 620px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 0px 20px 0px;
            margin-top: 50px;
          }
          .image-container {
            width: 52%;
            height: 99%;
            overflow: hidden;
            border-radius: 10px;
            padding: 5px;
          }
          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
          }
          .form-container {
            width: 40%;
            height: 90%;
          }
          .form-container h2 {
            margin: 10px auto;
            font-size: 2em;
          }
          .form-container label {
            display: block;
            margin-bottom: 5px;
          }
          .input-group {
            display: flex;
            align-items: center;
          }
          .input-group input {
            flex: 1;
            margin-right: 10px;
          }
          .social-text,
          .social-media {
            margin-top: 20px;
            text-align: center;
          }
          .social-media a {
            margin-right: 10px;
          }
        `}
      </style>

      <Navbar />

      <div className="box">
        <div className="login-container">
          <div className="form-container">
            <h2>Create your Account!</h2>

            <form onSubmit={handleSubmit}>
              <label>Firstname</label>
              <input
                onChange={changeFirstname}
                type="text"
                className="form-control mb-2"
                placeholder="Enter your firstname"
              />

              <label>Lastname</label>
              <input
                onChange={changeLastname}
                type="text"
                className="form-control mb-2"
                placeholder="Enter your lastname"
              />

              <label>Email Address</label>
              <input
                onChange={changeEmail}
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
              />

              <label>Password</label>
              <div className="input-group mb-2">
                <input
                  onChange={changePassword}
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>

              {/* Display password strength */}
              <div style={{ color, marginBottom: "10px" }}>
                Password Strength: {strength}
              </div>
              <div style={{
                height: "10px",  // Thinner bar height
                width: "100%",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
                marginBottom: "10px"
              }}>
                <div
                  style={{
                    height: "100%",
                    width: `${percent}%`,
                    backgroundColor: color,
                    borderRadius: "5px",
                  }}
                ></div>
              </div>

              <label>Confirm Password</label>
              <input
                onChange={changeConfirmPassword}
                type="password"
                className="form-control mb-2"
                placeholder="Confirm your password"
              />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "black",
                    borderRadius: "2px",
                    transition: "background-color 0.3s",
                  }}
                >
                  Create an Account
                </button>
              </div>

              <p
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  color: "black",
                }}
              >
                Already have an account? Please <a href="/login">Login</a>
              </p>
            </form>
          </div>
          <div className="image-container">
            <img
              src={register}
              alt="Background"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
