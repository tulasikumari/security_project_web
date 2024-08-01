import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";
import "../style/profile.css";
import Navbar from "../components/Navbar";
import hello from "../images/image.png";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm("Do you want to update your profile?");
    if (!confirmed) {
      return; // If not confirmed, exit the function
    }

    const formData = new FormData();
    formData.append("oldemail", localStorage.getItem("email"));
    formData.append("email", userData.email);
    formData.append("password", password || userData.password);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("contactNumber", userData.contactNumber);
    formData.append("address", userData.address);
    if (image) {
      formData.append("profileImage", image);
    }

    try {
      const response = await loginUserApi(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success("User profile updated successfully");
        localStorage.setItem("user", JSON.stringify(userData));
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
        .user-profile-container {
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  margin-top: 100px; /* Adjust this value to create the desired gap */
  height: calc(100vh - 40px); /* Adjust height to account for the margin */
  overflow-y: auto; /* Allow vertical scrolling */
  margin-bottom: 100px; /* Corrected property */
}


          .profile-left {
            width: 40%;
            padding: 10px;
            border-right: 1px solid #ccc;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .profile-image img {
            width: 300px;
            height: 300px;
            border-radius: 5%;
            margin-bottom: 10px;
          }

          .profile-info h2 {
            font-size: 18px;
            margin-bottom: 5px;
          }

          .profile-info p {
            font-size: 14px;
            margin: 2px 0;
          }

          .profile-right {
            width: 60%;
            padding: 10px;
            display: flex;
            flex-direction: column;
          }

          .profile-right h2 {
            font-size: 22px;
            margin-bottom: 10px;
          }

          .profile-form .form-group {
            margin-bottom: 10px;
          }

          .profile-form .form-group label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
          }

          .profile-form .form-group input {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            box-sizing: border-box;
          }

          .update-button {
            background-color: #000;
            color: #fff;
            padding: 10px 15px;
            font-size: 14px;
            border: none;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s ease;
            max-width: 200px; /* Limit width if needed */
            margin: 0 auto; /* Center horizontally */
          }

          .update-button:hover {
            background-color: #888; /* Gray color */
          }

          .small-update-button {
            background-color: #000;
            color: #fff;
            padding: 5px 10px;
            font-size: 12px;
            border: none;
            cursor: pointer;
            width: fit-content;
            transition: background-color 0.3s ease;
          }

          .small-update-button:hover {
            background-color: #888; /* Gray color */
          }
        `}
      </style>
      <Navbar />
      <div className="user-profile-container">
        <div className="profile-left">
          <div className="profile-image">
            <img
              src={image ? URL.createObjectURL(image) : hello}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
            <p>{userData.email}</p>
            <p>{userData.contactNumber}</p>
            <p>{userData.address}</p>
          </div>
        </div>
        <div className="profile-right">
          <h2>Profile Setting</h2>
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label htmlFor="FirstName">Full Name:</label>
              <input
                type="text"
                id="FirstName"
                value={`${userData.firstName} ${userData.lastName}` || ""}
                onChange={(e) => {
                  const [firstName, ...lastName] = e.target.value.split(" ");
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    firstName,
                    lastName: lastName.join(" "),
                  }));
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={userData.email || ""}
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                value={userData.contactNumber || ""}
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    contactNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={userData.address || ""}
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    address: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileImage">Profile Image:</label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="update-button">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
