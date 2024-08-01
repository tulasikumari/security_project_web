import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createShippingInfoApi, getShippingInfoByUserIdApi } from "../apis/Api";
import { toast } from "react-toastify";
import ProductDetails from "./Productdetails";

const ShippingForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [isEditMode, setIsEditMode] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    username: "",
    contactNumber: "",
    city: "",
    address: "",
    pickUpDate: "",
    returnDate: "",
    specificRequirements: "",
    citizenCardPhoto: null,
  });

  useEffect(() => {
    if (user && user._id) {
      getShippingInfo();
    }
  }, [user]);

  const getShippingInfo = () => {
    getShippingInfoByUserIdApi(user._id)
      .then((res) => {
        if (res.data.success === true && res.data.shippingInfo) {
          const info = res.data.shippingInfo;
          setShippingInfo({
            username: info.username,
            contactNumber: info.contactNumber,
            city: info.city,
            address: info.address,
            pickUpDate: info.pickUpDate,
            returnDate: info.returnDate,
            specificRequirements: info.specificRequirements,
          });
          setIsEditMode(true);
        } else {
          setIsEditMode(false);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch shipping information.");
        console.error(err);
      });
  };

  const changeUsername = (e) => {
    setShippingInfo({ ...shippingInfo, username: e.target.value });
  };

  const changeContactNumber = (e) => {
    setShippingInfo({ ...shippingInfo, contactNumber: e.target.value });
  };

  const changeCity = (e) => {
    setShippingInfo({ ...shippingInfo, city: e.target.value });
  };

  const changeAddress = (e) => {
    setShippingInfo({ ...shippingInfo, address: e.target.value });
  };

  const changePickUpDate = (e) => {
    setShippingInfo({ ...shippingInfo, pickUpDate: e.target.value });
  };

  const changeReturnDate = (e) => {
    setShippingInfo({ ...shippingInfo, returnDate: e.target.value });
  };

  const changeSpecificRequirements = (e) => {
    setShippingInfo({ ...shippingInfo, specificRequirements: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!shippingInfo.username || !shippingInfo.contactNumber || !shippingInfo.city || !shippingInfo.address || !shippingInfo.pickUpDate || !shippingInfo.returnDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userID", user._id);
    formData.append("username", shippingInfo.username);
    formData.append("contactNumber", shippingInfo.contactNumber);
    formData.append("city", shippingInfo.city);
    formData.append("address", shippingInfo.address);
    formData.append("pickUpDate", shippingInfo.pickUpDate);
    formData.append("returnDate", shippingInfo.returnDate);
    formData.append("specificRequirements", shippingInfo.specificRequirements);

    if (isEditMode) {
      // Update existing shipping info
      // Implement your update API call here
      toast.success("Shipping information updated successfully!");
      navigate("/review", {
        state: {
          cart: JSON.parse(localStorage.getItem("cart")),
          subtotal: JSON.parse(localStorage.getItem("subtotal")),
          securityDeposit: JSON.parse(localStorage.getItem("securityDeposit")),
          total: JSON.parse(localStorage.getItem("total")),
          newShippingInfoId: res.data.data._id,
        },
      });
    } else {
      // Create new shipping info
      createShippingInfoApi(formData)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success("Shipping information saved successfully!");

            const newShippingInfoId = res.data.data._id;
            localStorage.setItem("newShippingInfoId", newShippingInfoId);

            // Save dates to local storage
            localStorage.setItem("pickUpDate", shippingInfo.pickUpDate);
            localStorage.setItem("returnDate", shippingInfo.returnDate);

            setTimeout(() => {
              navigate("/review", {
                state: {
                  cart: JSON.parse(localStorage.getItem("cart")),
                  subtotal: JSON.parse(localStorage.getItem("subtotal")),
                  securityDeposit: JSON.parse(localStorage.getItem("securityDeposit")),
                  total: JSON.parse(localStorage.getItem("total")),
                  newShippingInfoId: newShippingInfoId,
                },
              });
            }, 1100);
          }
        })
        .catch((err) => {
          toast.error("Server Error");
          console.log(err.message);
        });
    }
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
      setShippingInfo({ ...shippingInfo, pickUpDate: value });
    } else if (name === "returnDate") {
      const pickUpDateValue = new Date(shippingInfo.pickUpDate);
      const selectedDate = new Date(value);
      if (selectedDate < pickUpDateValue) {
        toast.error("Return date cannot be before pick-up date");
        return;
      }
      setShippingInfo({ ...shippingInfo, returnDate: value });
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

        .hover\:bg-gray-600:hover {
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
              {isEditMode ? "Edit Your Reservation" : "Complete Your Reservation"}
            </h2>
            <form className="form-booking" onSubmit={handleCheckout}>
              <label className="label-booking">Full Name</label>
              <input
                className="input-booking"
                type="text"
                placeholder="Your Full Name"
                value={shippingInfo.username}
                onChange={changeUsername}
              />

              <label className="label-booking">Contact Number</label>
              <input
                className="input-booking"
                type="text"
                placeholder="Your Phone Number"
                value={shippingInfo.contactNumber}
                onChange={changeContactNumber}
              />

              <label className="label-booking">City</label>
              <select
                className="input-booking"
                value={shippingInfo.city}
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
                value={shippingInfo.address}
                onChange={changeAddress}
              />

              <label className="label-booking">Pick-up Date</label>
              <input
                className="input-booking"
                type="date"
                name="pickUpDate"
                placeholder="Pick-up Date"
                value={shippingInfo.pickUpDate}
                onChange={handleChange}
                required
              />

              <label className="label-booking">Return Date</label>
              <input
                className="input-booking"
                type="date"
                name="returnDate"
                placeholder="Return Date"
                value={shippingInfo.returnDate}
                onChange={handleChange}
                min={shippingInfo.pickUpDate}
                required
              />

              <label className="label-booking">Specific Requirements</label>
              <input
                className="input-booking"
                type="text"
                placeholder="Your Preferences"
                value={shippingInfo.specificRequirements}
                onChange={changeSpecificRequirements}
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/4 bg-black hover:bg-gray-600 text-white py-2 rounded mt-4"
                >
                  {isEditMode ? "UPDATE" : "CHECKOUT"}
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
