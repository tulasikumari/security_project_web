import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShippingInfoApi } from "../apis/Api";
import { toast } from "react-toastify";

const ShippingForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [specificRequirements, setSpecificRequirements] = useState("");
  const [citizenCardPhoto, setCitizenCardPhoto] = useState(null);

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changeContactNumber = (e) => {
    setContactNumber(e.target.value);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  const changePickUpDate = (e) => {
    setPickUpDate(e.target.value);
  };

  const changeReturnDate = (e) => {
    setReturnDate(e.target.value);
  };

  const changeSpecificRequirements = (e) => {
    setSpecificRequirements(e.target.value);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!username || !contactNumber || !city || !address || !pickUpDate || !returnDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userID", user._id);
    formData.append("username", username);
    formData.append("contactNumber", contactNumber);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("pickUpDate", pickUpDate);
    formData.append("returnDate", returnDate);
    formData.append("specificRequirements", specificRequirements);
    if (citizenCardPhoto) {
      formData.append("citizenCardPhoto", citizenCardPhoto);
    }

    createShippingInfoApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // Save shipping info to local storage
          const shippingInfo = {
            shippingID: res.data.shippingID,
            username,
            contactNumber,
            city,
            address,
            pickUpDate,
            returnDate,
            specificRequirements,
          };
          localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
          handleNavigateToReview(res.data.shippingID);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  const handleNavigateToReview = (shippingID) => {
    navigate('/payment', {
      state: {
        shippingID,
        shippingInfo: {
          
          username,
          address,
          contactNumber,
          pickUpDate,
          returnDate,
          specificRequirements,
        },
      },
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "pickUpDate") {
      const today = new Date();
      const selectedDate = new Date(value);
      if (selectedDate < today) {
        toast.error("Pick-up date cannot be before today's date");
        return;
      }
      setPickUpDate(value);
    } else if (name === "returnDate") {
      const pickUpDateValue = new Date(pickUpDate);
      const selectedDate = new Date(value);
      if (selectedDate < pickUpDateValue) {
        toast.error("Return date cannot be before pick-up date");
        return;
      }
      setReturnDate(value);
    } else if (name === "citizenCardPhoto") {
      setCitizenCardPhoto(files[0]);
    }
  };

  return (
    <>
      <style>
        {`
        .booking-item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f7f7f7;
        }

        .container-booking {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          width: 40%;
          padding: 10px;
        }

        .reservation-form {
          padding: 10px;
        }

        .form-booking {
          display: flex;
          flex-direction: column;
        }

        .label-booking {
          margin: 5px 0 3px;
          font-weight: bold;
        }

        .input-booking {
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .input-booking[type="date"] {
          padding: 7px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .w-1/4 {
          width: 30%;
        }

        .bg-blue-500 {
          background-color: #000000;
        }

        .hover:bg-gray-600:hover {
          background-color: gray;
        }

        .text-white {
          color: #fff;
        }

        .py-2 {
          padding-top: 0.4rem;
          padding-bottom: 0.4rem;
        }

        .rounded {
          border-radius: 0.25rem;
        }

        .mt-4 {
          margin-top: 0.5rem;
        }

        .flex {
          display: flex;
        }

        .justify-center {
          justify-content: center;
        }
        `}
      </style>
      <div className="booking-item">
        <div className="container-booking">
          <div className="reservation-form">
            <h2
              style={{
                marginBottom: "0",
                paddingTop: "3%",
                textAlign: "center",
              }}
            >
              Complete Your Reservation
            </h2>
            <form className="form-booking" onSubmit={handleCheckout}>
              <label className="label-booking">Full Name</label>
              <input
                className="input-booking"
                type="text"
                placeholder="Your Full Name"
                value={username}
                onChange={changeUsername}
              />

              <label className="label-booking">Contact Number</label>
              <input
                className="input-booking"
                type="text"
                placeholder="Your Phone Number"
                value={contactNumber}
                onChange={changeContactNumber}
              />

              <label className="label-booking">City</label>
              <select
                className="input-booking"
                value={city}
                onChange={changeCity}
              >
                <option value="">Select City</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>

              <label className="label-booking">Address</label>
              <input
                className="input-booking"
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={changeAddress}
              />

              <label className="label-booking">Pick-up Date</label>
              <input
                className="input-booking"
                type="date"
                name="pickUpDate"
                placeholder="Pick-up Date"
                value={pickUpDate}
                onChange={handleChange}
                required
              />

              <label className="label-booking">Return Date</label>
              <input
                className="input-booking"
                type="date"
                name="returnDate"
                placeholder="Return Date"
                value={returnDate}
                onChange={handleChange}
                min={pickUpDate}
                required
              />

              <label className="label-booking">Specific Requirements</label>
              <input
                className="input-booking"
                type="text"
                placeholder="Your Preferences"
                value={specificRequirements}
                onChange={changeSpecificRequirements}
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/4 bg-black hover:bg-gray-600 text-white py-2 rounded mt-4"
                >
                  Reserve
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingForm;
