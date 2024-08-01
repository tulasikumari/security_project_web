// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   checkoutCartApi,
//   clearCartApi,
//   getallorderapi,

// } from "../../apis/Api";
// import Navbar from "../../components/Navbar";

// const Cart = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const storedUserData = JSON.parse(localStorage.getItem("user"));
//     setUserData(storedUserData);
//   }, [id]);

//   const addToCart = (product) => {
//     const updatedCart = cart.map((item) =>
//       item.productId._id === product.productId._id
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//     setCart(updatedCart);
//   };

//   const removeFromCart = (product) => {
//     const updatedCart = cart.map((item) =>
//       item.productId._id === product.productId._id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setCart(updatedCart);
//   };

//   const getTotalPrice = () => {
//     let totalPrice = cart.reduce((total, item) => {
//       if (item.productId && item.productId.productPrice) {
//         return total + item.productId.productPrice * item.quantity;
//       } else {
//         return total;
//       }
//     }, 0);

//     // Add extra charge of 5000 NPR
//     totalPrice += 5000;

//     return totalPrice.toFixed(2);
//   };

//   const CartItem = ({ item, quantity, increase, decrease, remove }) => {
//     return (
//       <div className="cart-item">
//         <img
//           src={item.productId && item.productId.productImageUrl}
//           alt={item.productId && item.productId.productName}
//           className="cart-item-image"
//         />
//         <span>{item.productId && item.productId.productName}</span>
//         <span className="cart-item-price">
//           Price: NPR {item.productId && item.productId.productPrice}
//         </span>
//         <span className="cart-item-quantity">Quantity: {quantity}</span>
//         <button className="cart-item-button" onClick={() => increase(item)}>
//           +
//         </button>
//         <button className="cart-item-button" onClick={() => decrease(item)}>
//           -
//         </button>
//         <FontAwesomeIcon
//           icon={faTrashAlt}
//           className="delete-icon"
//           onClick={() => remove(item)}
//         />
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>
//         {`
//         .container {
//           max-width: 900px;
//           margin: auto;
//           padding: 60px;
//         }

//         .cart-heading {
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .cart-box {
//           border: 1px solid #ddd;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }

//         .cart-item {
//           display: flex;
//           align-items: center;
//           padding: 10px 0;
//           border-bottom: 1px solid #ddd;
//         }

//         .cart-item:last-child {
//           border-bottom: none;
//         }

//         .cart-item-image {
//           width: 50px;
//           height: 50px;
//           margin-right: 10px;
//         }

//         .cart-item-price,
//         .cart-item-quantity {
//           margin: 0 10px;
//         }

//         .cart-item-button {
//           background-color: black;
//           color: white;
//           border: none;
//           padding: 5px 10px;
//           margin: 0 5px;
//           cursor: pointer;
//           border-radius: 4px;
//         }

//         .cart-item-button:hover {
//           background-color: gray;
//         }

//         .delete-icon {
//           color: red;
//           cursor: pointer;
//           margin-left: 10px;
//         }

//         .delete-icon:hover {
//           color: darkred;
//         }

//         .cart-summary {
//           text-align: center;
//           margin-top: 20px;
//         }

//         .checkout-button {
//           background-color: black;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           cursor: pointer;
//           border-radius: 4px;
//         }

//         .checkout-button:hover {
//           background-color: gray;
//         }

//         .extra-charge {
//           font-size: 18px;
//           color: gray;
//           margin-top: 10px;
//         }
//         `}
//       </style>
//       <Navbar />
//       <div className="container mt-4">
//         <h1 className="cart-heading">Cart Items</h1>
//         <div className="cart-box">
//           {cart.map((item) => (
//             <CartItem
//               key={item._id}
//               item={item}
//               quantity={item.quantity}
//               increase={addToCart}
//               decrease={removeFromCart}
//               // remove={deleteFromCart}
//             />
//           ))}
//           <div className="cart-summary">
//             <h3>Total: NPR {getTotalPrice()}</h3>
//             <div className="extra-charge">
//               Extra Charge: NPR 5000 <br />
//               It will be returned after product return
//             </div>
//             {/* <button className="checkout-button" onClick={checkout}> */}
//             <button className="checkout-button">
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getCartByUserIDApi, removeFromCartApi } from "../../apis/Api";
// import { TrashIcon } from "@heroicons/react/24/solid";

// const AddToCart = () => {
//   const { id } = useParams();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     if (user && user._id) {
//       getCartByUserIDApi(user._id)
//         .then((res) => {
//           console.log("API Response:", res.data);
//           setCart(res.data.cart);
//         })
//         .catch((err) => {
//           toast.error("Server Error");
//           console.log(err.message);
//         });
//     } else {
//       toast.error("User not found in localStorage");
//     }
//   }, [user]);

//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to remove this item from the cart?"
//     );
//     if (!confirmDialog) {
//       return;
//     } else {
//       removeFromCartApi(id).then((res) => {
//         if (res.data.success === true) {
//           setCart(cart.filter((item) => item._id !== id));
//           toast.success(res.data.message);
//         } else {
//           toast.error(res.data.message);
//         }
//       });
//     }
//   };

//   const calculateSubtotal = () => {
//     return cart.reduce((acc, item) => acc + item.totalPrice, 0);
//   };

//   return (
//     <div>
//         <div className="max-w-6xl mx-auto p-2 mt-24 font-poppins">
//             <div className="space-y-2">
//                 {cart.length > 0 ? cart.map((Products) => (
//                     // shopping cart section
//                     <div key={Products._id} className="bg-white p-4 flex border-2 border-color: inherit rounded-lg h-auto">
//                         <img src={Products.productid.productImageUrl} alt={Products.productid.productName} className="w-1/6 h-55 object-cover" />
//                         {/* div 1*/}
//                         <div className="flex-1 flex justify-between gap-4">
//                             {/* div 2 */}
//                             <div className='flex flex-col items-start gap-4 pl-4'>
//                                 <h2 className="text-xl font-semibold">{Products.productid.productName}</h2>
//                                 {/* div 3 */}
//                                 <div className='flex flex-row items-start gap-4'>
//                                     {/* div 4 */}
//                                     <div className="flex-1 w-2/5 p-4 space-y-2">
//                                         <p className="text-customGray font-medium text-sm">
//                                             Rental Price <span className="font-bold text-gray-800">NPR. {Products.productid.productPrice}</span> for a week
//                                         </p>
//                                         {/* <p className="text-gray-600 font-light text-xs">Security Deposit Rs. {item.itemID.itemSecurityDeposit}</p> */}
//                                     </div>

    
//                                     {/* div 6 */}
//                                     <div>
//                                         {/* <p className="text-sm">Return Date: <br /> {new Date(item.returnDate).toLocaleDateString()}</p> */}
//                                     </div>
//                                     {/* div 8 */}
//                                     <div>
//                                         <p className="text-sm font-semibold">Total Price:<br /> NPR. {Products.totalPrice}</p>
//                                     </div>
//                                 </div>

//                                 <a href={`/itemdetails/${Products._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>

//                             </div>

//                             {/* div 9  */}
//                             <div className="flex flex-col items-center justify-center space-y-2 gap-4">
//                                 <button
//                                     onClick={() => handleDelete(Products._id)}
//                                     className="flex items-center justify-center w-full p-2 rounded"
//                                     style={{ backgroundColor: "#F7FAFC", border: "1.5px solid #DEE2E7" }}>
//                                     <TrashIcon className="w-4 h-4 text-red-500" />
//                                 </button>
//                                 <button
//                                     className="flex items-center justify-center w-full p-2 rounded"
//                                     style={{ backgroundColor: "#F7FAFC", border: "1.5px solid #DEE2E7" }}>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )) : (
//                     <p>Your cart is empty.</p>
//                 )}
//             </div>
//         </div>

//         {/* total calculation */}
//         <div className="max-w-xs mx-auto justify-content: flex-end bg-white p-6 rounded-lg shadow-md font-poppins">
//             <h2 className="text-center text-xl font-semibold mb-4">TOTALS</h2>
//             <div className="space-y-2">
//                 <div className="flex justify-between">
//                     <span>SUBTOTAL</span>
//                     <span>Rs. {calculateSubtotal()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span>SHIPPING</span>
//                     <span>Rs. 0</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span>DISCOUNT</span>
//                     <span>Rs. 0</span>
//                 </div>
//             </div>
//             <div className="flex justify-between font-bold mt-4">
//                 <span>TOTAL</span>
//                 <span>Rs. {calculateSubtotal()}</span>
//             </div>
//             <button className="w-full bg-blue-500 text-white py-2 rounded mt-4"><a href='/shippingForm'>CHECKOUT</a></button>
//         </div>
//     </div>
// );
// }

// export default AddToCart;