import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllUserorderApi } from "../apis/Api";
import { toast, ToastContainer } from "react-toastify";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   // Fetch the user's orders and update the cart state
  //   getAllUserorderApi(id).then((res) => {
  //     setCart(res.data.order);
  //   });
  // }, [id]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    toast.success("User logged out successfully.");
    navigate("/login");
  };

  const addToCart = () => {
    if (user) {
      console.log("Added");
      navigate("/review");
    } else {
      toast.error("Please login first.");
      navigate("/login");
    }
  };

  return (
    <>
      <style>
        {`
          .btn-outline-dark:hover {
            color: white;
          }
          .btn-outline-dark:hover {
            color: white;
            text-decoration: none;
          }
          .btn-outline-dark:active,
          .btn-outline-dark.active {
            color: white;
          }
          .active {
            color: white;
          }
          .btn-outline-secondary {
            background-color: white;
            border-color: black;
            color: black;
          }
          .btn-outline-secondary:hover {
            background-color: black;
            color: white;
          }
          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 0.5rem;
          }
          .btn-outline-primary {
            color: black;
            border-color: black;
            background-color: white;
          }
          .btn-outline-primary:hover {
            color: white;
            background-color: black;
            border-color: gray;
          }
          .btn-outline-danger {
            color: black;
            border-color: black;
            background-color: white;
          }
          .btn-outline-danger:hover {
            color: white;
            background-color: black;
            border-color: gray;
          }
          .cart-button {
            position: relative;
          }
          .cart-badge {
            position: absolute;
            top: -5px;
            right: -10px;
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
          }
        `}
      </style>
      <nav
        className="navbar navbar-expand-lg bg-white"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            style={{
              color: "black",
              fontWeight: "bold",
              marginRight: "350px",
              marginLeft: "30px",
              fontSize: "30px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            RentJewels
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  style={{
                    color: location.pathname === "/" ? "gray" : "black",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/ProductGrid"
                  className="nav-link"
                  activeClassName="active"
                  style={{
                    color:
                      location.pathname === "/ProductGrid" ? "gray" : "black",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link"
                  activeClassName="active"
                  style={{
                    color: location.pathname === "/contact" ? "gray" : "black",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/aboutus"
                  className="nav-link"
                  activeClassName="active"
                  style={{
                    color: location.pathname === "/aboutus" ? "gray" : "black",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/faq"
                  className="nav-link"
                  activeClassName="active"
                  style={{
                    color: location.pathname === "/faq" ? "gray" : "black",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  Faq
                </NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-dark cart-button"
                onClick={addToCart}
                style={{ marginRight: "10px" }}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                {/* <span className="cart-badge">{cart.length}</span> */}
              </button>

              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-dark dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {user.firstName}!
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/changepassword">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/order">
                        Order
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleLogout}
                        className="dropdown-item"
                        to="/logout"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link className="btn btn-outline-dark me-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-outline-dark" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
