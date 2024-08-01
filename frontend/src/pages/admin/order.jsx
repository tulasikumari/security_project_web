import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTable = () => {
    const [shippingInfo, setShippingInfo] = useState([]);

    useEffect(() => {
      const fetchShippingInfo = async () => {
        try {
          const response = await axios.get('/api/shipping-info'); // Adjust the endpoint as per your API structure
          setShippingInfo(response.data);
        } catch (error) {
          console.error('Failed to fetch shipping information:', error);
        }
      };
      fetchShippingInfo();
    }, []);
  
    return (
      <div>
        <h2>Shipping Information</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Pick Up Date</th>
              <th>Return Date</th>
              <th>Specific Requirements</th>
            </tr>
          </thead>
          <tbody>
            {shippingInfo.map(info => (
              <tr key={info._id}>
                <td>{info.userID}</td>
                <td>{info.username}</td>
                <td>{info.address}</td>
                <td>{info.contactNumber}</td>
                <td>{new Date(info.pickUpDate).toLocaleDateString()}</td>
                <td>{new Date(info.returnDate).toLocaleDateString()}</td>
                <td>{info.specificRequirements}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };




export default OrderTable;
