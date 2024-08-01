import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrderApi } from "../apis/Api";
import { toast } from "react-toastify";
import { getCartByUserIDApi } from "../apis/Api";
// import getShippingInfoByUserIDApi from "../apis/Api"

const Paymentsinof = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user._id;

  const [shippingInfo, setShippingInfo] = useState({});
  const [userID, setUserID] = useState(user._id);
  const [shoppingItemList, setShoppingItemList] = useState([]);
  const [shippingID, setShippingID] = useState({ shippingID: '' });
  const [totalPayment, setTotalPayment] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderStatus, setOrderStatus] = useState("PENDING");
  const [createdAt, setCreatedAt] = useState("");

  const [shoppingBag, setShoppingBag] = useState([]);


 

  useEffect(() => {
    getCartByUserIDApi(userid)
      .then((res) => {
        if (res.data.cart && Array.isArray(res.data.cart)) {
          setShoppingBag(res.data.cart);
          const total = res.data.cart.reduce(
            (acc, item) => acc + item.totalPrice,
            0
          );
          setTotalPayment(total+5000);
        } else {
          console.error("Invalid data format:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching shopping bag data:", error);
      });
  }, [userid]);

//   useEffect(() => {
  // useEffect(() => {
  //   getShippingInfoByUserIDApi(userid)
  //     .then((res) => {
  //       console.log('Fetched shopping bag data:', res.data.shoppingBag);
  //       if (res.data.shoppingBag && Array.isArray(res.data.shoppingBag)) {
  //         setShoppingBag(res.data.shoppingBag);
  //         const total = res.data.shoppingBag.reduce((acc, item) => acc + item.totalPrice, 0);
  //         setTotalPayment(total);
  //       } else {
  //         console.error('Invalid data format:', res.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching shopping bag data:', error);
  //     });
  // }, [userid]); // Closing the useEffect correctly here
  

  // Handle form submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Set createdAt to current time
    const currentTime = new Date().toISOString();
    setCreatedAt(currentTime);

    // Transform shoppingBag data to the desired format
    const shoppingItemList = shoppingBag.map((item) => ({
      shoppingBagID: item._id,
    }));

    // Construct FormData object
    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("shoppingItemList", JSON.stringify(shoppingItemList));
    formData.append("shippingID", shippingID);
    formData.append("totalPayment", totalPayment);
    formData.append("paymentMethod", paymentMethod);
    formData.append("orderStatus", orderStatus);
    formData.append("createdAt", currentTime);

    createOrderApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/success");
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-gray-200 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-center mb-6">
          PLACE YOUR RENT
        </h2>
        <div className="flex justify-center items-center mb-6 w-full">
          {/* Address */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">
              1
            </div>
            <span className="ml-2 pt-1.5">ADDRESS</span>
          </div>

          <div className="w-24 h-1 bg-gray-300 mx-4"></div>

          {/* Review */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">
              2
            </div>
            <span className="ml-2">REVIEW</span>
          </div>

          <div className="w-24 h-1 bg-gray-300 mx-4"></div>

          {/* Payment */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">
              3
            </div>
            <span className="ml-2">PAYMENT</span>
          </div>
        </div>

        {/* Payment form */}
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-blue-500 mb-4 text-center">
              Payment Method
            </h2>
            <form
              onSubmit={handlePlaceOrder}
              className="space-y-4 w-full flex flex-col items-center"
            >
              <div className="w-full">
                <label className="inline-flex items-center w-full justify-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="payment"
                    value="CASH ON DELIVERY"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
              </div>
              <div className="w-full">
                <label className="inline-flex items-center w-full justify-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="payment"
                    value="KHALTI"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2">Khalti</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymentsinof;
