import React, { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp, FaSearch } from "react-icons/fa"; // Import FaSearch icon
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProductsApi } from "../apis/Api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQueryUsers, setSearchQueryUsers] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    });
  }, []);

  useEffect(() => {
    handleSearchUsers();
  }, [searchQueryUsers]);

  const handleSearchUsers = () => {
    const lowerCaseQuery = searchQueryUsers.toLowerCase();
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleSort = () => {
    const sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.productName.localeCompare(b.productName);
      } else {
        return b.productName.localeCompare(a.productName);
      }
    });
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <style>
        {`
          .product-grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            overflow-y: auto; /* Enable vertical scrolling */
            max-height: calc(250vh - 250px); /* Adjust max-height based on your layout */
            padding-right: 20px; /* Add right padding to prevent content from getting hidden under scrollbar */
          }

          @media (min-width: 700px) {
            .product-grid-container {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .search-bar {
            position: relative; /* Ensure position context for absolute icon */
            padding: 5px 30px 5px 10px; /* Adjust padding for icon */
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 80%;
            margin-left: 20px;
            box-sizing: border-box;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }

          .search-bar input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 16px;
          }

          .search-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: grey;
          }

          .product-card {
            border: 1px solid #ddd;
            padding: 15px;
            text-align: center;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }

          .product-card img {
            width: 100%;
            height: 450px; /* Set a fixed height */
            object-fit: cover; /* Ensure the image covers the entire area */
          }

          .buy-button {
            margin-top: 10px;
            background-color: black;
            color: #fff;
            padding: 8px 16px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
          }

          .buy-button:hover {
            background-color: #333;
          }

          .header {
            text-align: left;
            margin-bottom: 20px;
            margin-top: 80px;
            margin-right: 10px;
            padding-left: 20px;
          }

          .filter-bar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-left: 20px;
            padding-right: 20px;
            position: sticky; /* Make it sticky */
            top: 0; /* Stick to the top */
            background-color: #fff; /* Ensure it's visible on scroll */
            z-index: 1; /* Ensure it's above other content */
          }

          .filter-bar {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .filter-bar span {
            font-size: 16px;
          }

          .filter-bar button {
            background: none;
            border: none;
            cursor: pointer;
            color: grey;
            font-size: 16px;
          }
        `}
      </style>
      <Navbar />
      <main style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <section className="product-section">
          <div className="header">
            <h2>Accessories on Rent</h2>
          </div>
          <div className="filter-bar-container">
            <div className="filter-bar">
              <span>Filter:</span>
              <button onClick={handleSort}>
                Availability {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
              </button>
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQueryUsers}
                onChange={(e) => setSearchQueryUsers(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
          </div>
          <div className="product-grid-container">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.productImageUrl} alt={product.productName} />
                <div>
                  <h3>{product.productName}</h3>
                  <p>Rent Rs: {product.productPrice} per day</p>
                </div>
                <Link
                  to={`/viewproduct/${product._id}`}
                  className="buy-button"
                >
                  View more
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductGrid;
