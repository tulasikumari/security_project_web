import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const BookingForm = ({ products = [] }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({});
  const [showPaymentConfirmation, setShowPaymentConfirmation] =
    React.useState(false);

  React.useEffect(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      setFormData(JSON.parse(storedUserData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "departureDate") {
      const today = new Date();
      const selectedDate = new Date(value);
      if (selectedDate < today) {
        toast.error("Departure date cannot be before today's date");
        return;
      }
    }
    if (name === "returnDate" && formData.departureDate) {
      const departureDate = new Date(formData.departureDate);
      const selectedDate = new Date(value);
      if (selectedDate < departureDate) {
        toast.error("Return date cannot be before departure date");
        return;
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.paymentMethod === "eSewa") {
      // Show confirmation popup for eSewa payment
      setShowPaymentConfirmation(true);
    } else {
      // Proceed with booking for other payment methods
      handleBooking();
    }
  };

  const handleBooking = () => {
    // Simulating booking process
    // Here you can add actual booking logic

    // Show toast notification for booking done
    toast.success("Booking successful!", {
      position: toast.POSITION.TOP_CENTER,
    });

    // Redirect to checkout page after booking
    navigate("/checkout", { state: { products } });
  };

  const handleConfirmPayment = () => {
    // Close payment confirmation popup
    setShowPaymentConfirmation(false);

    // Proceed with booking
    handleBooking();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            padding: 10px 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .navbar a {
            text-decoration: none;
            color: #333;
            margin: 0 10px;
            font-size: 16px;
          }
          .booking-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            background-color: #f4f4f4;
            min-height: 140vh;
          }
          .booking-form-content {
            display: flex;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 90%;
            max-width: 800px;
            padding: 10px;
          }
          .form-summary {
            flex: 1;
            padding: 10px;
          }
          .form-details {
            flex: 2;
            padding: 10px;
          }
          .form-details input,
          .form-details select,
          .form-details button {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .form-details button {
            background-color: #000;
            color: #fff;
            cursor: pointer;
          }
          .form-details button:hover {
            background-color: #333;
          }
          @media (max-width: 600px) {
            .booking-form-content {
              flex-direction: column;
              padding: 10px;
            }
            .form-summary,
            .form-details {
              width: 100%;
              padding: 10px 0;
            }
          }
        `}
      </style>
      <Navbar />
      <div className="booking-form-container">
        <div className="booking-form-content">
          {products.map((product) => (
            <div key={product.productId} className="form-summary">
              <h3>Product Summary</h3>
              <img
                src={product.productImageUrl}
                alt={product.productName}
                style={{ width: "100%", height: "auto" }}
              />
              <p>{product.productName}</p>
              <h4>Total: {product.productPrice}</h4>
              {/* Other product details */}
              <Link
                to={`/viewproduct/${product.productId}`}
                className="buy-button"
              >
                View more
              </Link>
            </div>
          ))}
          <div className="form-details">
            <form onSubmit={handleSubmit}>
              <label>User Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
              <label>Phone Number</label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber || ""}
                onChange={handleChange}
                required
              />
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address || ""}
                onChange={handleChange}
                required
              />
              <label>Departure date</label>
              <input
                type="date"
                name="departureDate"
                placeholder="Departure Date"
                value={formData.departureDate || ""}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Minimum date is today
                required
              />
              <label>Return date</label>
              <input
                type="date"
                name="returnDate"
                placeholder="Return Date"
                value={formData.returnDate || ""}
                onChange={handleChange}
                min={formData.departureDate} // Minimum date is departure date
                required
              />
              <label>Identity Document</label>
              <input
                type="file"
                name="citizenCardPhoto"
                onChange={handleChange}
                required
              />
              <label>Select Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="eSewa">eSewa</option>
              </select>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button type="submit">Book</button>
                <button type="button" onClick={handlePrint}>
                  <i className="fas fa-print"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* Payment confirmation popup */}
      {showPaymentConfirmation && (
        <div className="payment-confirmation">
          <p>Proceed to pay with eSewa?</p>
          <div>
            <button onClick={handleConfirmPayment}>Yes</button>
            <button onClick={() => setShowPaymentConfirmation(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

BookingForm.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookingForm;
