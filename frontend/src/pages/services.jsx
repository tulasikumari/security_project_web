// Import necessary React libraries
import React from 'react';
import Navbar from '../components/Navbar';

// Functional component for the Service page
const ServicePage = () => {
  return (
    <>
   <style>
        {`
      /* ServicePage.css */

      .service-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
      .service-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      
      .service-item {
        width: 48%;
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #fff;
      }
      
      .cta-section {
        margin-top: 40px;
        text-align: center;
      }
      
      button {
        background-color: #4caf50;
        color: #fff;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      button:hover {
        background-color: #45a049;
      }
      
        `}
      </style>

      <Navbar/>
    <div>
      <h2>Our Services</h2>
      <p>
        At DecorEase Furniture, we strive to provide high-quality services to meet your
        needs. Explore our range of services below:
      </p>

      {/* Service List */}
      <ul>
        <li>
          <strong>Custom Furniture Design:</strong> We offer custom furniture
          design services to bring your unique ideas to life.
        </li>
        <li>
          <strong>Furniture Restoration:</strong> Our skilled craftsmen can
          restore and refurbish your old furniture to its former glory.
        </li>
        <li>
          <strong>Delivery and Assembly:</strong> Enjoy hassle-free furniture
          delivery and assembly services for your convenience.
        </li>
        <li>
          <strong>Interior Design Consultation:</strong> Get expert advice on
          choosing the right furniture for your space with our interior design
          consultation services.
        </li>
      </ul>

      {/* Call to Action */}
      <div>
        <h3>Contact Us for Your Furniture Needs</h3>
        <p>
          Whether you're looking for a custom design or need assistance with
          furniture restoration, our team is here to help. Contact us today for
          personalized service.
       <br></br>
       <br></br>
        <p>Email: homedecore@email.com</p>
        <p>Phone: 9874561230</p>
        <p>Location: NewRoad,Kathmadu</p>

        </p>
        
        {/* Add your contact form or contact information here */}
      </div>
    </div>
    </>
  );
};

// Export the ServicePage component
export default ServicePage;
