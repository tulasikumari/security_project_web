import React from "react";
import Navbar from "../components/Navbar";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 mt-24 font-poppins">
        <div className="bg-white p-8 border-2 border-color: inherit rounded-lg shadow-md text-center" style={{ width: "500px", height: "500px", margin: "0 auto" }}>
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-center mb-6">Payment Successful!</h1>
          <p className="text-lg text-center">
            <br />
            Thank you for your payment. Your order has been successfully processed.
          </p>
          {/* Additional details or order summary can be displayed here */}
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
