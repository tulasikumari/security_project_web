import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <style>
        {`
        .gap-top {
          margin-top: 100px; /* Adjust the value as needed */
        }
        // .container {
        //   font-family: Arial, sans-serif;
        //   line-height: 1.6;
        //   color: #333;
        //   padding: 20px;
        // }
        // h1 {
        //   font-size: 36px;
        //   color: #000;
        // }
        h2 {
          font-size: 18px;
          color: #007BFF;
          margin-top: 20px;
        }
        p, ul {
          font-size: 16px;
          margin: 10px 0;
        }
        ul {
          padding-left: 20px;
        }
        ul li {
          margin-bottom: 10px;
        }
        `}
      </style>
      <Navbar />
      <div className="container gap-top">
        <p>Last updated: June 20, 2024</p>
        
        
        <p>Welcome to RentJewels! These Terms and Conditions outline the rules and regulations for the use of our website.</p>
        
        <h2>1. Intellectual Property Rights</h2>
        <p>Unless otherwise stated, RentJewels and/or its licensors own the intellectual property rights for all material on RentJewels.</p>
        
        <h2>2. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>Publishing any website material in any other media</li>
          <li>Selling, sublicensing, and/or otherwise commercializing any website material</li>
          <li>Publicly performing and/or showing any website material</li>
          <li>Using this website in any way that is or may be damaging to this website</li>
          <li>Using this website in any way that impacts user access to this website</li>
        </ul>
        
        <h2>3. Rent Policy</h2>
        <p>Customers can rent jewelry items for a specified period, subject to availability. Rental charges must be paid in full at the time of booking. Extensions are allowed if requested and approved before the rental period ends, and additional charges may apply.</p>
        
        <h2>4. Return Policy</h2>
        <p>All rented items must be returned on or before the due date in the same condition they were rented out. Late returns will incur additional charges. If a return is delayed beyond the grace period, legal action may be taken to recover the items or their value.</p>
        
        <h2>5. Damage and Fine Policy</h2>
        <p>Customers are responsible for any loss or damage to the rented items. Any damages or losses will be assessed, and repair or replacement costs will be charged to the customer. If the item is beyond repair, the full market value of the item will be charged as a fine.</p>
        
        <h2>6. Limitation of Liability</h2>
        <p>In no event shall RentJewels, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.</p>
        
        <h2>7. Indemnification</h2>
        <p>You hereby indemnify to the fullest extent RentJewels from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
        
        <h2>8. Variation of Terms</h2>
        <p>RentJewels is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review these Terms on a regular basis.</p>
     
        <h2>9. Entire Agreement</h2>
        <p>These Terms constitute the entire agreement between RentJewels and you in relation to your use of this website and supersede all prior agreements and understandings.</p>
        
        <h2>10. Governing Law & Jurisdiction</h2>
        <p>These Terms will be governed by and interpreted in accordance with the laws of the State of kathmandu, and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your State] for the resolution of any disputes.</p>
      </div>
      <Footer/>
    </>
  );
};

export default TermsAndConditions;
