// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { getOrdersByUserIDApi } from "../apis/Api"; // Ensure this API exists
// import { useNavigate } from "react-router-dom";

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user && user._id) {
//       getOrdersByUserIDApi(user._id)
//         .then((res) => {
//           setOrders(res.data.orders);
//         })
//         .catch((err) => {
//           setError("Failed to fetch orders.");
//           toast.error("Failed to fetch orders.");
//           console.error(err.message);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       toast.error("User not found in localStorage");
//       navigate("/login"); // Redirect to login or another appropriate page
//     }
//   }, [user, navigate]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="max-w-7xl mx-auto p-4 mt-10">
//       <h2 className="text-2xl font-semibold mb-6">Order History</h2>
//       {orders.length > 0 ? (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 border-b">
//               <th className="p-2 text-left">Order ID</th>
//               <th className="p-2 text-left">Date</th>
//               <th className="p-2 text-left">Total Amount</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-center">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="border-b">
//                 <td className="p-2">{order._id}</td>
//                 <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td className="p-2">NPR. {order.totalAmount}</td>
//                 <td className="p-2">{order.status}</td>
//                 <td className="p-2 text-center">
//                   <button
//                     onClick={() => navigate(`/order/${order._id}`)}
//                     className="text-teal-600 hover:text-teal-800"
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-xl">No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
