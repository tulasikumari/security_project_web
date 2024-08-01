import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";

const Sidebar = ({ handleLogout }) => {
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    toast.success("Admin has logged out successfully.");
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          .sidebar {
            width: 250px;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: black;
            padding-top: 20px;
            color: white;
            overflow-x: hidden;
            transition: 0.5s;
          }

          @media (max-width: 768px) {
            .sidebar {
              width: 100%;
            }
          }

          .sidebar a {
            padding: 15px;
            text-decoration: none;
            font-size: 18px;
            color: white;
            display: block;
            transition: background-color 0.3s;
          }

          .sidebar a:hover,
          .sidebar a.active {
            background-color: gray;
          }

          .brand-name {
            margin-left: 10px;
          }

          .list-group-item-action {
            cursor: pointer;
          }
        `}
      </style>
      <Navbar />

      <div className="sidebar">
        <Link
          to="/admin/dashboard"
          className={`list-group-item-action py-2 ${
            activeLink === 1 ? "active" : ""
          }`}
          onClick={() => handleLinkClick(1)}
        >
          <i className="bi bi-speedometer2 fs-5 me-2"></i>
          <span className="fs-5">Dashboard</span>
        </Link>

        <Link
          to="/admin/dashboard"
          className={`list-group-item-action py-2 ${
            activeLink === 2 ? "active" : ""
          }`}
          onClick={() => handleLinkClick(2)}
        >
          <i className="bi bi-box fs-5 me-2"></i>
          <span className="fs-5">Products</span>
        </Link>

        <Link
          to="/contacttable"
          className={`list-group-item-action py-2 ${
            activeLink === 3 ? "active" : ""
          }`}
          onClick={() => handleLinkClick(3)}
        >
          <i className="bi bi-house fs-5 me-2"></i>
          <span className="fs-5">Contact</span>
        </Link>

        <Link
          to="/usertable"
          className={`list-group-item-action py-2 ${
            activeLink === 4 ? "active" : ""
          }`}
          onClick={() => handleLinkClick(4)}
        >
          <i className="bi bi-people fs-5 me-2"></i>
          <span className="fs-5">Users</span>
        </Link>

        <Link
          to="/adminorder"
          className={`list-group-item-action py-2 ${
            activeLink === 5 ? "active" : ""
          }`}
          onClick={() => handleLinkClick(5)}
        >
          <i className="bi bi-people fs-5 me-2"></i>
          <span className="fs-5">Order</span>
        </Link>

        <Link
          // to="/login"
          to="/logout"
          className="list-group-item-action py-2"
          onClick={handleLogoutClick}
        >
          <i className="bi bi-box-arrow-right fs-5 me-2"></i>
          <span className="fs-5">Logout</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
