// import React, { useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   getShoppingBagByUserIDApi,
//   removeFromShoppingBagApi,
// } from "../apis/Api";

// const ShoppingBag = () => {
//   const { id } = useParams();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [shoppingBag, setShoppingBag] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getShoppingBagByUserIDApi(user._id)
//       .then((res) => {
//         setShoppingBag(res.data.shoppingBag);
//       })
//       .catch((err) => {
//         toast.error("Server Error");
//         console.log(err.message);
//       });
//   }, [user._id]);

//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to remove this item from the shopping bag?"
//     );
//     if (!confirmDialog) {
//       return;
//     } else {
//       removeFromShoppingBagApi(id).then((res) => {
//         if (res.data.success) {
//           window.location.reload();
//           toast.success(res.data.success);
//         } else {
//           toast.error(res.data.message);
//         }
//       });
//     }
//   };

//   const calculateSubtotal = () => {
//     return shoppingBag.reduce((acc, item) => acc + item.totalPrice, 0);
//   };

//   const handleCheckout = () => {
//     navigate("/paymentSuccess");
//   };

//   const handleBackClick = () => {
//     navigate(-1); // This navigates to the previous page
//   };

//   return (
//     <div>
//       <div className="mt-8 font-poppins">
//         <div className="w-full flex justify-between bg-white top-0 left-0 right-0 p-4 inherit z-50">
//           <div className="flex gap-2">
//             <button
//               onClick={handleBackClick}
//               className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
//             >
//               <label>left</label>
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold">My Shopping Bag</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-6xl mx-auto p-2 font-poppins">
//         <div className="space-y-2">
//           {shoppingBag.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white p-4 flex border-2 border-color: inherit rounded-lg h-auto"
//             >
//               <img
//                 src={item.productID.productImageURL}
//                 alt={item.productID.productName}
//                 className="w-1/6 h-55 object-cover"
//               />
//               <div className="flex-1 flex justify-between gap-4">
//                 <div className="flex flex-col items-start gap-4 pl-4">
//                   <h2 className="text-xl font-semibold">
//                     {item.productID.productName}
//                   </h2>
//                   <div className="flex flex-row items-start gap-4">
//                     <div className="flex-1 w-2/5 p-4 space-y-2">
//                       <p className="text-customGray font-medium text-sm">
//                         Rental Price{" "}
//                         <span className="font-bold text-gray-800">
//                           NPR. {item.productID.productRentalPrice}
//                         </span>{" "}
//                         for 4 days
//                       </p>
//                       <p className="text-gray-600 font-light text-xs">
//                         Security Deposit Rs.{" "}
//                         {item.productID.productSecurityDeposit}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm">
//                         Rental Date:
//                         <br />
//                         {new Date(item.deliveryDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm">
//                         Return Date: <br />{" "}
//                         {new Date(item.returnDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm">
//                         Rented Quantity: <br /> {item.quantity}{" "}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold">
//                         Total Price:
//                         <br /> NPR. {item.totalPrice}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex space-x-1 items-center">
//                     {[...Array(5)].map((_, index) => {
//                       const ratingValue = index + 1;
//                       return (
//                         <label key={index} className="cursor-pointer">
//                           <FaStar
//                             size={24}
//                             className={
//                               ratingValue <= (ratingValue || 0)
//                                 ? "text-yellow-500"
//                                 : "text-gray-300"
//                             }
//                           />
//                         </label>
//                       );
//                     })}
//                     <span
//                       className="ml-2 text-gray-600"
//                       style={{ fontSize: "14px" }}
//                     >
//                       ({5} reviews)
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-center justify-center space-y-2 gap-4">
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="flex items-center justify-center w-full p-2 rounded"
//                     style={{
//                       backgroundColor: "#F7FAFC",
//                       border: "1.5px solid #DEE2E7",
//                     }}
//                   >
//                     {/* <TrashIcon className="w-4 h-4 text-red-500" /> */}
//                     <label> delete</label>
//                   </button>
//                   <button
//                     className="flex items-center justify-center w-full p-2 rounded"
//                     style={{
//                       backgroundColor: "#F7FAFC",
//                       border: "1.5px solid #DEE2E7",
//                     }}
//                   >
//                     <Link
//                       to={`/shoppingBagEdit/${item._id}`}
//                       className="text-green-600 hover:text-indigo-900"
//                     >
//                       <label>edit</label>
//                     </Link>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="max-w-xs mx-auto justify-content: flex-end bg-white p-6 rounded-lg shadow-md font-poppins">
//         <h2 className="text-center text-xl font-semibold mb-4">TOTALS</h2>
//         <div className="space-y-2">
//           <div className="flex justify-between">
//             <span>SUBTOTAL</span>
//             <span>Rs. {calculateSubtotal()}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>SHIPPING</span>
//             <span>Rs. 0</span>
//           </div>
//           <div className="flex justify-between">
//             <span>DISCOUNT</span>
//             <span>Rs. 0</span>
//           </div>
//         </div>
//         <div className="flex justify-between font-bold mt-4">
//           <span>TOTAL</span>
//           <span>Rs. {calculateSubtotal()}</span>
//         </div>
//         <button
//           onClick={handleCheckout}
//           className="w-full bg-blue-500 text-white py-2 rounded mt-4"
//         >
//           CHECKOUT
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShoppingBag;
