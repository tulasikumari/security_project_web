// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getOrderByIdApi } from "../apis/Api"; // Ensure this API exists
// import { toast } from "react-toastify";

// const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getOrderByIdApi(orderId)
//       .then((res) => {
//         setOrder(res.data.order);
//       })
//       .catch((err) => {
//         setError("Failed to fetch order details.");
//         toast.error("Failed to fetch order details.");
//         console.error(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [orderId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="max-w-7xl mx-auto p-4 mt-10">
//       <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
//       {order ? (
//         <div>
//           <p><strong>Order ID:</strong> {order._id}</p>
//           <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//           <p><strong>Total Amount:</strong> NPR. {order.totalAmount}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           <h3 className="text-xl font-semibold mt-4 mb-2">Items</h3>
//           <ul>
//             {order.items.map((item) => (
//               <li key={item._id} className="mb-2">
//                 {item.productName} - Quantity: {item.quantity} - NPR. {item.totalPrice}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No order details available.</p>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;
