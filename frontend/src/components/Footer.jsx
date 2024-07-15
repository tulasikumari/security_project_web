import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

const Footer = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return !!localStorage.getItem("authToken"); // Update as per your authentication method
  };

  const footerLinkStyle = {
    color: "white",
    gap: "10px",
    textDecoration: "none", // Remove underline
    fontFamily: "Montserrat, sans-serif", // Set font
    fontSize: "19px", // Increase the font size
    marginRight: "10px", // Add right margin to create space between links
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (isLoggedIn()) {
      localStorage.clear();
      toast.success("You have been logged out successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {
      toast.error("Please login first.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (isLoggedIn()) {
      navigate("/profile");
    } else {
      toast.error("Please login first.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const footerTextStyle = {
    fontSize: "24px",
    fontFamily: "Montserrat, sans-serif",
    marginBottom: "20px", // Add bottom margin for spacing
  };

  const columnStyle = {
    padding: "0 0px", // Adjust padding to reduce the gap
  };

  const rowStyle = {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",
  };

  const footerHeadingStyle = {
    fontSize: "28px", // Increase the font size for headings
    fontFamily: "Montserrat, sans-serif",
  };

  const dotStyle = {
    fontSize: "18px", // Set font size for dots
    marginRight: "15px", // Add margin to separate dots from links
    color: "white", // Set color for the dot
  };

  return (
    <>
      <section
        className="contact-section"
        style={{
          backgroundColor: "#F5F5F5",
          color: "black",
          padding: "30px 0",
          display: "flex",
          alignItems: "center",
          marginLeft: "10px",
          marginRight: "20px",
          justifyContent: "space-between",
          boxShadow: "0 4px 6px rgba(1, 1, 1, 0.1)",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <h2 style={{ marginLeft: "40px" }}>Do You Have Questions?</h2>
          <p style={{ marginLeft: "40px" }}>
            We'll help you to grow your career and growth.
          </p>
        </div>

        <br />

        <button
          style={{
            backgroundColor: "black",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "50px",
          }}
        >
          Contact Us Today
        </button>
      </section>
      <br />

      <footer
        className="bg-body-black text-center text-lg-start"
        style={{ color: "white", backgroundColor: "black" }}
      >
        <div className="container p-4">
          <div className="row" style={rowStyle}>
            <div
              className="col-lg-6 col-md-12 mb-4 mb-md-0"
              style={columnStyle}
            >
              <h1 className="text" style={footerHeadingStyle}>
                RentJewels
              </h1>
              <p style={footerTextStyle}>
                "Accessorize your moments" adds a touch of <br />
                elegance and emphasizes the idea of enhancing special occasions
                with rented jewelry.
              </p>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0" style={columnStyle}>
              <h5 className="text-uppercase" style={footerHeadingStyle}>
                Quick Links
              </h5>
              <ul className="list-unstyled">
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/homepage" style={footerLinkStyle}>
                    Home
                  </Link>
                </li>
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/ProductGrid" style={footerLinkStyle}>
                    Products
                  </Link>
                </li>
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/contact" style={footerLinkStyle}>
                    Contact
                  </Link>
                </li>
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/aboutus" style={footerLinkStyle}>
                    About
                  </Link>
                </li>
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/faq" style={footerLinkStyle}>
                    Faq
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0" style={columnStyle}>
              <h5
                className="text-uppercase"
                style={{ ...{
                    fontSize: '28px',
                    fontFamily: 'Montserrat, sans-serif'
                  }, visibility: "hidden" }}
              >
                .
              </h5>
              <ul className="list-unstyled">
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/profile" style={footerLinkStyle} onClick={handleProfileClick}>
                    Profile
                  </Link>
                </li>
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/logout" style={footerLinkStyle} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0" style={columnStyle}>
              <h5
                className="text-uppercase"
                style={{ ...{
                    fontSize: '28px',
                    fontFamily: 'Montserrat, sans-serif'
                  }, visibility: "hidden" }}
              >
                .
              </h5>
              <ul className="list-unstyled">
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/TermsAndConditions" style={footerLinkStyle}>
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <span style={dotStyle}>•</span>
                  <Link to="/Privacy policy" style={footerLinkStyle}>
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "#292c2f", color: "#8f9296" }}
        >
          &copy; {new Date().getFullYear()} DecorEase | All rights reserved
        </div>
      </footer>
      <ToastContainer />
    </>
  );
};

export default Footer;
