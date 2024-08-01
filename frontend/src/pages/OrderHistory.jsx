// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('/api/orders'); // Adjust URL if needed
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <h2>Order History</h2>
//       <ul>
//         {orders.map((order) => (
//           <li key={order._id}>
//             <p>Order ID: {order.orderId}</p>
//             <p>Product ID: {order.productId}</p>
//             <p>Quantity: {order.quantity}</p>
//             {/* Add more details as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OrderHistory;
