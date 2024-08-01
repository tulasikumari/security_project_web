import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createcontact, getAllProductsApi } from "../apis/Api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// import short from '../images/short.png';
import about from "../images/about12.png";
import ear from "../images/earrings.jpg";
import hand from "../images/hand.jpg";
import home from "../images/home.png";
import home1 from "../images/home1st.png";
import home2 from "../images/home2nd.png";
import home3 from "../images/home3.png";
import neck from "../images/neck.png";

const Homepage = () => {
  // useEffect for fetching all products and show in table
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQueryUsers, setSearchQueryUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllProductsApi().then((res) => {
      console.log(res.data.products);
      setProducts(res.data.products);
      console.log(products);
    });

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);

      // const passwordExpiryMinutes = 90; // 
      // const now = new Date();
      // const passwordAgeInMinutes = Math.floor(
      //   (now - new Date(user.passwordLastChanged)) / (1000 * 60)
      // );

      // if (passwordAgeInMinutes > passwordExpiryMinutes) {
      //   toast.error("Your password has expired. Please change your password.");
      //   navigate("/login");
       
      // }
    }
  }, []);



  const [searchQuery, setSearchQuery] = useState("");

  console.log(products);

  const handleSearchUsers = () => {
    console.log("we are at 56");
    console.log(searchQueryUsers);

    const filteredUsers = products.filter((products) => {
      const lowerCaseQuery = searchQueryUsers.toLowerCase();
      return products.productName.toLowerCase().includes(lowerCaseQuery);
    });
    setProducts(filteredUsers);
  };
  const handleSort = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.productName.localeCompare(b.productName);
      } else {
        return b.productName.localeCompare(a.productName);
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      setFormData(JSON.parse(storedUserData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitforviewmore1 = () => {
    // Navigate to the login page
    window.location.href = "/ProductGrid";
  };
  const handleSubmitforviewmore2 = () => {
    // Navigate to the login page
    window.location.href = "/ProductGrid";
  };
  const handleSubmitforviewmore3 = () => {
    // Navigate to the login page
    window.location.href = "/ProductGrid";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    console.log("Form Data:", data);

    try {
      const response = await createcontact(data);
      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  const Review = ({ name, date, content }) => {
    return (
      <div className="review">
        <h3>{name}</h3>
        <p>{date}</p>
        <p>{content}</p>
      </div>
    );
  };
  const teamMembers = [
    {
      name: "Order",
      role: "Choose your jeweler, Select the dates & checkout. Jewelry is delivered at your doorstep.",
      image: "https://cdn4.iconfinder.com/data/icons/jewellery-1/100/7-512.png",
    },
    {
      name: "Service Excellence",
      role: "Choose your jeweler, Select the dates & checkout. Jewelry is delivered at your doorstep.",
      image:
        "https://static.vecteezy.com/system/resources/previews/000/546/318/original/diamond-vector-logo.jpg",
    },
    {
      name: "Easy To Return",
      role: "Return the jewelry in the packaging we send. Deposit is refunded with-in 2 working days.",
      image:
        "https://static-00.iconduck.com/assets.00/return-icon-2048x1866-c8h3yn0w.png",
    },
  ];

  const services = [
    {
      title: "Jewelry Rental",
      description:
        "Rent exquisite jewelry for any occasion without the commitment of ownership.",
      image:
        "https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-hanging-door-sign-board-with-text-png-image_4732854.png",
    },
    {
      title: "Home Delivery",
      description:
        "Customize your jewelry to match your unique style and preferences.",
      image:
        "https://zeevector.com/wp-content/uploads/Free-Home-Delivery-Logo-PNG@.png",
    },
    {
      title: "Easy to return",
      description:
        "We offer return services to keep your jewelry sparkling and makes the user easy.",
      image:
        "https://thumbs.dreamstime.com/b/easy-returns-sign-label-delivery-service-vector-stock-illustration-261431911.jpg",
    },
  ];

  const renderTeamMembers = () => {
    return teamMembers.map((member, index) => (
      <div key={index} className="team-member">
        <img src={member.image} alt={member.name} />
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    ));
  };

  return (
    <>
      <style>
        {`
        
          .container, .content-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 50px;
            gap: 20px;
            padding: 0 10%;
          }

          .text, .text1 {
            flex: 1;
          }

          .image, .image1 {
            flex: 1;
            text-align: center;
          }

          .image img, .image1 img {
            width: 80%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            min-width: 200px;
            min-height: 200px;
          }

          hr {
            width: 80%;
            margin: 20px auto;
            border: 1px solid #ccc;
          }

          .image-container {
            position: relative;
            width: 100%;
            height: 600px;
            overflow: hidden;
            margin-left:50px;
            
          }

          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .overlay-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-align: center;
          }

          .overlay-text h1 {
            font-size: 36px;
            margin: 0;
          }

          .team-section, .services-section {
            padding: 20px 10%;
            text-align: center;
            background: #f9f9f9;
          }

          .team-section h2, .services-section h2 {
            margin-bottom: 20px;
          }

          .team-member, .service {
            display: inline-block;
            width: calc(33.33% - 10px);
            margin: 5px;
            text-align: center;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .team-member img, .service img {
            width: 80%;
            height: auto;
            margin-bottom: 10px;
            margin:20px;
            min-width: 200px;
            min-height: 300px;
          }

          .service img {
            height: 20px; /* Adjust the height of the services images */
            // object-fit: contain; /* Ensure images are contained within the specified height */
          }

          // .team-member:hover, .service:hover {
          //   transform: scale(1.05);
          // }

          .team-member h3, .service h3 {
            margin: 1px 0 5px;
            font-size: 18px;
            color: gray;
          }

          .team-member p, .service p {
            margin: 0;
            color: gray;
          }

          @media (max-width: 768px) {
            .team-member, .service {
              width: calc(50% - 10px);
            }
          }

          @media (max-width: 600px) {
            .container, .content-container {
              flex-direction: column;
              padding: 0 50%;
            }

            .team-member, .service {
              width: 200%;
              margin: 100px 0;
            }
          
    /* Your existing styles... */

    .product-grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
    }

    /* Adjust the grid layout to show 4 products per row */
    @media (min-width: 700px) {
      .product-grid-container {
        grid-template-columns: repeat(3, minmax(150px, 1fr));
      }
    }

    .search-bar {
      grid-column: span 3; /* Span across three columns to make it longer */
      margin-bottom: 20px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 50%; /* Make the search box 50% width */
      box-sizing: border-box; /* Include padding and border in the width */
    }

    /* Add spacing to the product cards */
    .product-card {
      border: 1px solid #ddd;
      padding: 15px;
      text-align: center;
      margin-bottom: 20px; /* Add margin between product cards */
    }

   
    .product-card img {
      max-width: 150%;
      height: 300px; /* Adjust the height to your desired size */
      object-fit: cover;
    }

    .buy-button {
      margin-top: 10px;
      background-color: teal;
      color: #fff;
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
    }

    /* Add a small gap between buttons */
    .buy-button + .buy-button {
      margin-left: 10px;
    }
    /* Add spacing to the product cards */
.product-card {
  border: 2px solid #ddd;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px; /* Add margin between product cards */
}
.product-cart h3{
  margin:0;
}
.product-card div {
  margin-bottom: 10px; /* Add margin between product name and price */
}

.product-card img {
  max-width: 200%;
  height: 250px; /* Set a specific height for the images */
  object-fit: cover; /* Use 'cover' to maintain aspect ratio and cover the container */
}

.buy-button {
  margin-top: 10px;
  background-color: teal;
  color: #fff;
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
.scrollable-image-container {
  max-height: 500px; /* Set the maximum height as needed */
  overflow: auto;
}

/* Add padding to the main content */
main {
  padding: 20px;
}


.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Adjust the min and max width as needed */
  gap: 20px; /* Adjust the gap between feature items */
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-item img {
  width: 100px; /* Adjust the width of the images */
  height: auto;
}
.Features {
  text-align: center;
}

.feature-heading-container {
  display: inline-block;
}
.product-section{
  text-align: center;
}
.feature-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.feature-content img {
  max-width: 100%;
  height: auto;
}

.feature-details {
  text-align: center;
  color: Black; 
}
.feature-box {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.feature-box {
  width: 200px; /* Adjust the width as needed */
  height:250px;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px; /* Add margin for spacing */
}

.text {
  flex: 1;
}

.image {
  flex: 1;
  text-align: right;
  margin-left: 20px; /* Adjust as needed */
}
.image1{
  flex: 1;
  text-align: left;
  margin-left: 95px; /* Adjust as needed */
}

.image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

hr {
  width: 100%;
  margin: 20px 0; /* Adjust as needed */
  border: 1px solid #ccc; /* Adjust line style */
}

.content-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px; /* Add margin for spacing */
}

.text {
  flex: 1;
}
.text1 {
  flex: 1;
  margin-right:90px;
}




.image1 img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

hr {
  width: 100%;
  margin: 20px 0; /* Adjust as needed */
  border: 1px solid #ccc; /* Adjust line style */
}



  `}
      </style>
      {/* <h1>Welcome to Dashboard</h1> */}
      <div>
        <Navbar />
        <br></br>
        <main>
          <div
            className="image-container"
            style={{ position: "relative", top: "36px", left: "-58px" }}
          >
            <div
              className="overlay-text"
              style={{
                position: "absolute",
                top: "250px",
                left: "300px",
                zIndex: 1,
                color: "white",
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              <h1
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "36px",
                  margin: 0,
                }}
              >
                Rent Jewels
              </h1>
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "25px",
                  margin: 0,
                }}
              >
                Rent Jewels is a jewelry rental service that <br />
                offers a wide range of exquisite pieces for special occasions.
              </p>
            </div>
            <div className="image">
              <img
                src={home}
                alt="Introduction"
                style={{
                  height: "600px",
                  width: "200%",
                  maxWidth: "105%",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>
        </main>
      </div>
      <>br</>

      <main>
        <section
          className="what-we-offer"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          <h1>What We Offer</h1>
        </section>
        <div
          className="offerings"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            className="offering"
            style={{
              marginRight: "20px",
              boxShadow: "0 4px 6px rgba(1, 1, 1, 1)",
            }}
          >
            <img
              src={ear}
              alt="Offering 1"
              style={{ width: "450px", height: "430px", borderRadius: "0px" }}
            />
            {/* <p>Offering Description 1</p> */}
          </div>
          <div
            className="offering"
            style={{
              marginRight: "20px",
              boxShadow: "0 4px 6px rgba(1, 1, 1, 1)",
            }}
          >
            <img
              src={neck}
              alt="Offering 2"
              style={{ width: "450px", height: "430px", borderRadius: "0px" }}
            />
            {/* <p>Offering Description 2</p> */}
          </div>
          <div
            className="offering"
            style={{
              marginRight: "20px",
              boxShadow: "0 4px 6px rgba(1, 1, 1, 1)",
            }}
          >
            <img
              src={hand}
              alt="Offering 3"
              style={{ width: "450px", height: "430px", borderRadius: "0px" }}
            />
            {/* <p>Offering Description 3</p> */}
          </div>
        </div>
      </main>

      <main>
        <div
          className="jewelery collaection"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          <h1> Jewelery Collection </h1>
        </div>

        <div
          className="jewelery-collection"
          style={{
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}
        >
          <div
            className="offering"
            style={{
              position: "relative",
              marginRight: "20px",
              marginLeft: "28px",
              boxShadow: "0 4px 6px rgba(1, 1, 1, 1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={home1}
                alt="Offering 1"
                style={{
                  width: "900px",
                  height: "700px",
                  borderRadius: "0px",
                }} // Adjust the value as needed
              />
            </div>
          </div>
          <div
            className="info-box"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              backgroundColor: "white",
              padding: "100px",
              boxSizing: "border-box",
              textAlign: "center",
              border: "1px solid black",
              marginLeft: "calc(67% + 50px)",
            }}
          >
            <h2>Ear rings</h2>
            <p>An earring is a decorative accessory worn on the earlobe.</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleSubmitforviewmore1}
                className="btn btn-primary w-10 h-10"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                  borderRadius: "2px",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "black";
                }}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </main>

      <main>
        <div
          className="jewelery-collection"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          <div
            className="jewelery-collection"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="info-box"
              style={{
                position: "absolute",
                right: "-5%",
                transform: "translate(-195%, +30%)",
                width: "500px",
                backgroundColor: "white",
                padding: "110px",
                boxSizing: "border-box",
                textAlign: "center",
                border: "1px solid black",
                marginLeft: "calc(15% + 50px)",
                zIndex: "2",
              }}
            >
              <h2>Bridal Jewelery</h2>
              <p>An earring is a decorative accessory worn on the earlobe.</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={handleSubmitforviewmore2}
                  className="btn btn-primary w-10 h-10"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "black",
                    borderRadius: "2px",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#333";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "black";
                  }}
                >
                  View More
                </button>
              </div>
            </div>
            <div
              className="offering"
              style={{
                position: "relative",
                marginRight: "-520px",

                boxShadow: "0 4px 6px rgba(1, 1, 1, 1)",
                zIndex: "1",
              }}
            >
              <img
                src={home2}
                alt="Offering 1"
                style={{ width: "900px", height: "700px", borderRadius: "0px" }}
              />
            </div>
          </div>
        </div>
      </main>
      <br></br>

      {/*  3rd image  */}
      <main>
        <div
          className="jewelery-collection"
          style={{
            textAlign: "center",
            position: "relative",
            display: "inline-block",
          }}
        >
          <div
            className="offering"
            style={{
              position: "relative",
              marginRight: "20px",
              marginLeft: "28px",
              boxShadow: "0 4px 6px rgba(1, 1, 1, 1)",
            }}
          >
            <img
              src={home3}
              alt="Offering 1"
              style={{ width: "900px", height: "700px", borderRadius: "0px" }}
            />
          </div>
          <div
            className="info-box"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              backgroundColor: "white",
              padding: "100px",
              boxSizing: "border-box",
              textAlign: "center",
              border: "1px solid black",
              marginLeft: "calc(67% + 50px)",
            }}
          >
            <h2>Engagement Jewelery</h2>
            <p>An earring is a decorative accessory worn on the earlobe.</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleSubmitforviewmore3}
                className="btn btn-primary w-10 h-10"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                  borderRadius: "2px",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "black";
                }}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </main>
      <br></br>

      <main>
        <div
          className="jewelery-collection"
          style={{ textAlign: "center", marginTop: "px" }}
        >
          <h1>About Us</h1>
        </div>
        <div
          className="jewelery-collection"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "30px",
            padding: "20px",
          }}
        >
          <div
            className="offering"
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <img
              src={about}
              alt="Offering 1"
              style={{ width: "700px", height: "500px", borderRadius: "0px" }}
            />
          </div>
          <div
            className="text"
            style={{
              maxWidth: "1500px",
              textAlign: "left",
              fontSize: "20px",
              lineHeight: "1.6",
            }}
          >
            <h2>Our main goal is to provide customer satisfaction</h2>
            <p>
              Our primary objective at Rent Jewels is to ensure customer
              satisfaction.
              <br />
              We are committed to delivering unparalleled service and exquisite
              jewelry
              <br />
              that surpasses expectations, catering to the unique desires and
              pref
              <br />
              erences of each individual. Through personalized attention,
              attention to detail, and a dedication to quality, we strive to
              create memorable experiences that leave our customers delighted
              and fulfilled. At Rent Jewels, customer satisfaction is not just a
              goal; it's our guiding principle, driving everything we do.
            </p>
          </div>
        </div>
      </main>

      <div className="team-section">
        <h2>How To Rent</h2>

        {renderTeamMembers()}
      </div>
      <br></br>

      <Footer />
    </>
  );
};

export default Homepage;
