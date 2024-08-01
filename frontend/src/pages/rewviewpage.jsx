import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCartByUserIDApi, removeFromCartApi } from "../apis/Api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const AddToCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [pickUpDate, setPickUpDate] = useState(
    localStorage.getItem("pickUpDate")
  );
  const [returnDate, setReturnDate] = useState(
    localStorage.getItem("returnDate")
  );

  useEffect(() => {
    if (user && user._id) {
      getCartByUserIDApi(user._id)
        .then((res) => {
          console.log("API Response:", res.data);
          setCart(res.data.cart);
        })
        .catch((err) => {
          toast.error("Server Error");
          console.log(err.message);
        });
    } else {
      toast.error("User not found in localStorage");
    }
  }, [user]);

  const handleCheckout = () => {
    const subtotal = calculateSubtotal();
    const totalAmount = subtotal + 5000; // Calculate the total amount including the security deposit

    const shoppingBag = {
      cartItems: cart,
      totalAmount,
    };

    navigate("/ship", { state: { shoppingBag } });
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (!confirmDialog) {
      return;
    } else {
      removeFromCartApi(id).then((res) => {
        if (res.data.success === true) {
          setCart(cart.filter((item) => item._id !== id));
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  return (
    <>
    <style>
      {`
      /* Container styling */
.max-w-4xl {
  max-width: 1000px;
  margin: auto;
  padding: 1rem;
  margin-top: 1.5rem;
  
  font-family: 'Poppins', sans-serif;
}

/* Table styling */
.table-auto {
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-collapse: separate;
  border-spacing: 0;
}

.table-auto thead tr {
  background-color: #f8f8f8;
}

.table-auto th,
.table-auto td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.table-auto th {
  font-weight: 600;
  color: #374151;
}

.table-auto td {
  color: #4b5563;
}

.table-auto img {
  width: 100px;
  height: 80px;
  border-radius: 0.25rem;
  object-fit: cover;
}

.table-auto button {
  padding: 0.25rem 0.5rem;
  background-color: #ef4444;
  color: white;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
}

.table-auto button:hover {
  background-color: #dc2626;
}

/* Totals box styling */
.max-w-xs {
  max-width: 250px;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 0;
  right: 0;
}

.max-w-xs h2 {
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

.max-w-xs div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.max-w-xs .font-semibold {
  font-weight: 600;
}

.max-w-xs button {
  margin-top: 1rem;
  width: 100%;
  background-color: #1f2937;
  color: white;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.max-w-xs button:hover {
  background-color: #14b8a6;
}

/* Overall layout adjustments */
.flex {
  display: flex;
  justify-content: space-between;
}

.mt-24 {
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }

  .max-w-xs {
    margin-top: 1.5rem;
    margin-left: auto;
    margin-right: auto;
  }
}

      `}
    </style>
    <Navbar />
    <br></br>
    <br></br>
    <br></br>
    <div className="max-w-4xl mx-auto p-2 mt-24 font-poppins">
      {cart.length > 0 ? (
        <div className="flex justify-between">
          <table className="table-auto w-3/4 bg-white rounded-lg shadow-md text-xs">
            <thead>
              <tr className="text-left">
                <th className="px-1 py-1 border">Image</th>
                <th className="px-1 py-1 border">Name</th>
                <th className="px-1 py-1 border">Rental Price</th>
                <th className="px-1 py-1 border">Qty</th>
                <th className="px-1 py-1 border">Pick-up</th>
                <th className="px-1 py-1 border">Return</th>
                <th className="px-1 py-1 border">Total</th>
                <th className="px-1 py-1 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-1 py-1 border">
                    <img
                      src={product.productid.productImageUrl}
                      alt={product.productid.productName}
                      className="w-10 h-10 object-cover"
                    />
                  </td>
                  <td className="px-1 py-1 border">
                    {product.productid.productName}
                  </td>
                  <td className="px-1 py-1 border">
                    NPR. {product.productid.productPrice} per day
                  </td>
                  <td className="px-1 py-1 border">{product.quantity}</td>
                  <td className="px-1 py-1 border">
                    {new Date(pickUpDate).toLocaleDateString()}
                  </td>
                  <td className="px-1 py-1 border">
                    {new Date(returnDate).toLocaleDateString()}
                  </td>
                  <td className="px-1 py-1 border">NPR. {product.totalPrice}</td>
                  <td className="px-1 py-1 border">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-1/4 ml-4 bg-white p-2 rounded-lg shadow-md text-xs">
            <h2 className="text-center text-sm font-semibold mb-2">TOTALS</h2>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Subtotal:</span>
              <span className="font-semibold">NPR. {calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Security Deposit:</span>
              <span className="font-semibold">NPR. 5000</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Shipping:</span>
              <span className="font-semibold">FREE</span>
            </div>
            <div className="border-t border-gray-300 mt-2 pt-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">
                  NPR. {calculateSubtotal() + 5000}
                </span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-2 w-full bg-black hover:bg-teal-600 text-white font-semibold py-1 px-2 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl">Your cart is empty.</p>
      )}
    </div>
    </>
  );
};

export default AddToCart;
