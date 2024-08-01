import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
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
         h2 {
          color: #007BFF; /* Blue color for headings */
        }
        h1 {
          font-size: 28px; /* Smaller font size for h1 */
        }
        h2 {
          font-size: 20px; /* Smaller font size for h2 */
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
        <p>Welcome to RentJewels! This Privacy Policy outlines how we collect, use, and protect your information when you use our website.</p>
        
        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>Personal identification information (name, email address, phone number, etc.)</li>
          <li>Payment information (credit card details, billing address, etc.)</li>
          <li>Rental history and preferences</li>
          <li>Browser and device information</li>
          <li>Cookies and usage data</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect in the following ways:</p>
        <ul>
          <li>To process your rentals and payments</li>
          <li>To improve our website and services</li>
          <li>To personalize your experience on our website</li>
          <li>To communicate with you, including sending promotional offers</li>
          <li>To comply with legal obligations</li>
        </ul>
        
        <h2>3. How We Protect Your Information</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information. Your information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.</p>
        
        <h2>4. Sharing Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
        
        <h2>5. Cookies</h2>
        <p>We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to turn off all cookies via your browser settings, but some features of our site may not function properly without cookies.</p>
        
        <h2>6. Third-Party Links</h2>
        <p>Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites.</p>
        
        <h2>7. Your Consent</h2>
        <p>By using our site, you consent to our Privacy Policy.</p>
        
        <h2>8. Changes to Our Privacy Policy</h2>
        <p>If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change.</p>
        
        <h2>9. Contacting Us</h2>
        <p>If there are any questions regarding this privacy policy, you may contact us using the information below:</p>
        <p>
          RentJewels<br />
          Email: support@rentjewels.com<br />
          Phone: 123-456-7890<br />
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
