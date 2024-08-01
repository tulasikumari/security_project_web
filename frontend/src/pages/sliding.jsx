import React, { useState } from "react";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "./Login"; // Assuming you have a Login component
import Register from "./Register"; // Assuming you have a Register component

const Sliding = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    
  };

  return (
    <>
    {
      `
      .container {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      
      .form-container {
        display: flex;
        transition: transform 0.5s ease;
      }
      
      .slide-right {
        transform: translateX(-100%);
      }
      
      .slide-left {
        transform: translateX(0%);
      }
      
      .toggle-button {
        margin-top: 20px;
      }
      
      `
    }
    <div className="box">
      <div className="container">
        <div className={isLoginForm ? "form-container slide-right" : "form-container slide-left"}>
          {isLoginForm ? <Login /> : <Register />}
          <button className="toggle-button" onClick={toggleForm}>
            {isLoginForm ? "Create an Account" : "Already have an Account?"}
          </button>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Sliding;
