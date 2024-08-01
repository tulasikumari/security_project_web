// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { create_order, getProductDetailsApi } from "../apis/Api";
// // import Navbar from "../components/Navbar";

// // const ProductDetails = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [cart, setCart] = useState([]);
// //   const [cartValue, setCartValue] = useState(1);
// //   const [userData, setUserData] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     getProductDetailsApi(id).then((res) => {
// //       setProduct(res.data.product);
// //     });
// //   }, [id]);

// //   const add = () => {
// //     navigate("/book", { state: { product } });
// //   };

// //   const addToCart = () => {
// //     const storedUserData = JSON.parse(localStorage.getItem("user"));
// //     setUserData(storedUserData);

// //     if (!cart.find((item) => item.id === id)) {
// //         const orderData = {
// //             userId: storedUserData._id,
// //             productId: id,
// //             quantity: cartValue,
// //         };

// //         create_order(orderData)
// //             .then((res) => {
// //                 if (res.data.success === false) {
// //                     toast.error(res.data.message);
// //                 } else {
// //                     const cartItem = {
// //                         id: id,
// //                         name: product.productName,
// //                         price: product.productPrice,
// //                         quantity: cartValue,
// //                         imageUrl: product.productImageUrl, // Ensure image URL is passed
// //                         orderId: res.data.order.orderId,
// //                     };
// //                     localStorage.setItem("cart", JSON.stringify([...cart, cartItem])); // Save to local storage
                    
// //                     if (window.confirm("Item added to cart! Do you want to view the cart?")) {
// //                         navigate("/cart");
// //                     }
// //                 }
// //             })
// //             .catch((err) => {
// //                 toast.error("Server Error");
// //                 console.log(err.message);
// //             });
// //     } else {
// //         alert("Item is already in the cart!");
// //     }
// // };


// //   if (!product) {
// //     return <p>Loading...</p>;
// //   }

// //   return (
// //     <>
// //       <style>
// //         {`
// //           .image-container {
// //             flex: 1;
// //             overflow: hidden;
// //             max-width: 400px; 
// //             height: 500px; 
// //           }
// //           .image-container img {
// //             width: 100%;
// //             height: 100%;
// //             object-fit: cover; 
// //           }
// //           .navbar {
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //             background-color: #fff;
// //             padding: 10px 20px;
// //             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //           }
// //           .navbar a {
// //             text-decoration: none;
// //             color: #333;
// //             margin: 0 10px;
// //             font-size: 16px;
// //           }
// //           .welcome {
// //             background-color: #f0f0f0;
// //             padding: 10px 20px;
// //             border-radius: 5px;
// //           }
// //           .product-details-container {
// //             display: flex;
// //             justify-content: center;
// //             align-items: center;
// //             padding: 20px;
// //             background-color: #f4f4f4;
// //             min-height: 100vh;
// //           }
// //           .product-details-content {
// //             display: flex;
// //             background-color: #fff;
// //             border-radius: 10px;
// //             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //             overflow: hidden;
// //             width: 80%;
// //             max-width: 1000px;
// //           }
// //           .details-container {
// //             flex: 1;
// //             display: flex;
// //             flex-direction: column;
// //             justify-content: center;
// //             align-items: center;
// //             padding: 20px;
// //           }
// //           .details-container h2 {
// //             margin-top: 0;
// //           }
// //           .details-container p {
// //             margin: 10px 0;
// //             line-height: 2.9;
// //           }
// //           .details-container button {
// //             display: inline-block;
// //             padding: 10px 20px;
// //             background-color: #000;
// //             color: #fff;
// //             text-decoration: none;
// //             border-radius: 5px;
// //             font-size: 16px;
// //             cursor: pointer;
// //             border: none;
// //             outline: none;
// //           }
// //           .details-container button:hover {
// //             background-color: black;
// //           }
// //         `}
// //       </style>
// //       <Navbar />
// //       <div className="product-details-container">
// //         <div className="product-details-content">
// //           <div className="image-container">
// //             <img src={product.productImageUrl} alt={product.productName} />
// //           </div>
// //           <div className="details-container">
// //             <h2>{product.productName}</h2>
// //             <p>{`Rent Rs: ${product.productPrice} per day`}</p>
// //             <p>{product.productDescription}</p>
// //             <button onClick={addToCart}>Rent Now</button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };
// // export default ProductDetails;


// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { addToCartApi, getProductDetailsApi } from "../apis/Api";
// // import Navbar from "../components/Navbar";

// // const ProductDetails = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [productquantity, setProductquantity]= useState();
// //   const [userData, setUserData] = useState(null);
// //   const navigate = useNavigate();



// //   useEffect(() => {
// //     getProductDetailsApi(id).then((res) => {
// //       setProduct(res.data.product);
// //     });

// //     const storedUserData = JSON.parse(localStorage.getItem("user"));
    
// //     setUserData(storedUserData);
// //   }, [id]);
// //   const user = JSON.parse(localStorage.getItem('user'))

// //   const handleRentNow = (e) => {
// //     e.preventDefault();
// //     const rentalPrice = parseFloat(product.productPrice);
// //     // const securityDeposit = parseFloat(product.productSecurityDeposit);
// //     const quantity = productquantity; // Use the updated quantity state here
 
// //     // Calculate total price as (rental price + security deposit) * quantity
// //     const totalPrice = rentalPrice  * quantity;
 
// //     const formData = new FormData();
// //     formData.append('userID', user._id);
// //     formData.append('productid', id);
// //     formData.append('totalPrice', totalPrice);  // Correctly use the calculated total price
// //     formData.append('quantity', quantity);  // Correctly use the cart quantity
 
// //     addToCartApi(formData)
// //       .then((res) => {
// //         if (res.data.success === false) {
// //           toast.error(res.data.message);
// //         } else {
// //           toast.success(res.data.message);
// //         }
// //       })
// //       .catch((err) => {
// //         toast.error("Server  gvfh Error");
// //         console.log(err.message);
// //       });
// //   };
 
 
// //   const handleIncrease = () => {
// //     setQuantity((prevQuantity) => {
// //       if (prevQuantity < product.productquantity) {
// //         return prevQuantity + 1;
// //       } else {
// //         toast.warning('Please check the number of quantity available and choose');
// //         return prevQuantity;
// //       }
// //     });
// //   };
 
// //   const handleDecrease = () => {
// //     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
// //   };

// //   if (!product) {
// //     return <p>Loading...</p>;
// //   }

// //   return (
// //     <>
// //       <style>
// //         {`
// //           .image-container {
// //             flex: 1;
// //             overflow: hidden;
// //             max-width: 400px; 
// //             height: 500px; 
// //           }
// //           .image-container img {
// //             width: 100%;
// //             height: 100%;
// //             object-fit: cover; 
// //           }
// //           .navbar {
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //             background-color: #fff;
// //             padding: 10px 20px;
// //             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //           }
// //           .navbar a {
// //             text-decoration: none;
// //             color: #333;
// //             margin: 0 10px;
// //             font-size: 16px;
// //           }
// //           .welcome {
// //             background-color: #f0f0f0;
// //             padding: 10px 20px;
// //             border-radius: 5px;
// //           }
// //           .product-details-container {
// //             display: flex;
// //             justify-content: center;
// //             align-items: center;
// //             padding: 20px;
// //             background-color: #f4f4f4;
// //             min-height: 100vh;
// //           }
// //           .product-details-content {
// //             display: flex;
// //             background-color: #fff;
// //             border-radius: 10px;
// //             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //             overflow: hidden;
// //             width: 80%;
// //             max-width: 1000px;
// //           }
// //           .details-container {
// //             flex: 1;
// //             display: flex;
// //             flex-direction: column;
// //             justify-content: center;
// //             align-items: center;
// //             padding: 20px;
// //           }
// //           .details-container h2 {
// //             margin-top: 0;
// //           }
// //           .details-container p {
// //             margin: 10px 0;
// //             line-height: 2.9;
// //           }
// //           .details-container button {
// //             display: inline-block;
// //             padding: 10px 20px;
// //             background-color: #000;
// //             color: #fff;
// //             text-decoration: none;
// //             border-radius: 5px;
// //             font-size: 16px;
// //             cursor: pointer;
// //             border: none;
// //             outline: none;
// //           }
// //           .details-container button:hover {
// //             background-color: black;
// //           }
// //         `}
// //       </style>
// //       <Navbar />
// //       <div className="product-details-container">
// //         <div className="product-details-content">
// //           <div className="image-container">
// //             <img src={product.productImageUrl} alt={product.productName} />
// //           </div>
// //           <div className="details-container">
// //             <h2>{product.productName}</h2>
// //             <p>{`Rent Rs: ${product.productPrice} per day`}</p>
// //             <p>{product.productDescription}</p>
// //             <div className="quantity-contained">
// //                   <button onClick={handleDecrease} className="quantityAdd-button">-</button>
                 
// //                   <input style={{color:'#9A5865',border:'none'}} className="quantity-display"
// //                     onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
// //                     type="number"
// //                     name="Quantity"
// //                     id="Quantity"
// //                     value={quantity}
// //                     min="1"
// //                     max={product.productquantity}
                   
// //                   />
// //                   <button onClick={handleIncrease} className="quantityAdd-button">+</button>
// //                 </div>
// //             <button onClick={handleRentNow}>Rent Now</button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { addToCartApi, getProductDetailsApi } from "../apis/Api";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [productquantity, setProductquantity] = useState(1); // Initialize with a default value
//   const [userData, setUserData] = useState(null);
//   const[Productname, setpeoductname]=useState();
//   const[productImageUrl, setproductImageUrl]=useState();

//   const navigate = useNavigate();

//   useEffect(() => {
//     getProductDetailsApi(id)
//       .then((res) => {
//         console.log("Product Details:", res.data); 
//         setProduct(res.data.product);
//         setProductquantity(res.data.product.quantity); 
//       })
//       .catch((error) => {
//         console.error("Error fetching product details:", error);
//         toast.error("Failed to fetch product details. Please try again.");
//       });

//     const storedUserData = JSON.parse(localStorage.getItem("user"));
//     setUserData(storedUserData);
//   }, [id]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleRentNow = (e) => {
//     e.preventDefault();
    

//     if (!product) {
//       toast.error(
//         "Product details not loaded. Please wait or refresh the page."
//       );
//       return;
//     }

//     const rentalPrice = parseFloat(product.productPrice);
//     const totalPrice = rentalPrice * quantity;

//     const formData = new FormData();
//     formData.append("userID", user._id);
//     formData.append("productid", id);
//     formData.append("totalPrice", totalPrice);
//     formData.append("quantity", quantity);
//     formData.append("Productname",product);
//    formData.append("productimage",productImageUrl);
//     addToCartApi(formData)
//       .then((res) => {
//         console.log("Add to Cart Response:", res.data); // Log add to cart response
//         if (res.data.success === false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//           // Add the product details to localStorage
//           const cartItem = {
//             productid: {
//               _id: id,
//               productName: product.productName,
//               productPrice: product.productPrice,
//               productImageUrl: product.productImageUrl,
//               productquantity:product.quantity,
//             },
//             totalPrice,
//             quantity,
//           };
//           const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
//           localStorage.setItem(
//             "cart",
//             JSON.stringify([...currentCart, cartItem])
//           );
//         }
//         navigate("/review"); // Redirect to cart or shipping page
//       })
//       .catch((err) => {
//         console.error("Error adding to cart:", err);
//         toast.error("Failed to add item to cart. Please try again.");
//       });
//   };


//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => {
//       if (prevQuantity < product.productquantity) {
//         return prevQuantity + 1;
//       } else {
//         toast.warning('Please check the number of quantity available and choose');
//         return prevQuantity;
//       }
//     });
//   };
 
//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };
//   if (!product) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <style>
//         {`
//            .image-container {
//             flex: 1;
//             overflow: hidden;
//             max-width: 400px; 
//             height: 500px; 
//           }
//           .image-container img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover; 
//           }
//           .navbar {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             background-color: #fff;
//             padding: 10px 20px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           }
//           .navbar a {
//             text-decoration: none;
//             color: #333;
//             margin: 0 10px;
//             font-size: 16px;
//           }
//           .welcome {
//             background-color: #f0f0f0;
//             padding: 10px 20px;
//             border-radius: 5px;
//           }
//           .product-details-container {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             padding: 20px;
//             background-color: #f4f4f4;
//             min-height: 100vh;
//           }
//           .product-details-content {
//             display: flex;
//             background-color: #fff;
//             border-radius: 10px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             overflow: hidden;
//             width: 80%;
//             max-width: 1000px;
//           }
//           .details-container {
//             flex: 1;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             padding: 20px;
//           }
//           .details-container h2 {
//             margin-top: 0;
//           }
//           .details-container p {
//             margin: 10px 0;
//             line-height: 2.9;
//           }
//           .details-container button {
//             display: inline-block;
//             padding: 10px 20px;
//             background-color: #000;
//             color: #fff;
//             text-decoration: none;
//             border-radius: 5px;
//             font-size: 16px;
//             cursor: pointer;
//             border: none;
//             outline: none;
//           }
//           .details-container button:hover {
//             background-color: black;
//           }
//             .quantityAdd-button:hover {
//   background-color: gray; /* Change to gray on hover */
//   color: white; /* Change text color */
// }
//         `
       

//         }
//       </style>
//       <Navbar />
//       <div className="product-details-container">
//         <div className="product-details-content">
//           <div className="image-container">
//             <img src={product.productImageUrl} alt={product.productName} />
//           </div>
//           <div className="details-container">
//             <h2>{product.productName}</h2>
//             <p>Rent Rs: {product.productPrice} per day</p>
//             <p>{product.productDescription}</p>
//             <div
//               className="quantity-contained"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <button
//                 onClick={handleDecrease}
//                 className="quantityAdd-button"
//                 style={{ marginRight: "5px" }}
//               >
//                 -
//               </button>
//               <input
//                 style={{
//                   color: "#9A5865",
//                   border: "none",
//                   textAlign: "center",
//                   width: "50px",
//                 }}
//                 className="quantity-display"
//                 onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
//                 type="number"
//                 name="Quantity"
//                 id="Quantity"
//                 value={quantity}
//                 min="1"
//                 max={product.productquantity}
//               />
//               <button
//                 onClick={handleIncrease}
//                 className="quantityAdd-button"
//                 style={{ marginLeft: "5px" }}
//               >
//                 +
//               </button>
//             </div>
//             <br />

//             <button onClick={handleRentNow}>Rent Now</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCartApi, getProductDetailsApi } from "../apis/Api";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productquantity, setProductquantity] = useState(1); // Initialize with a default value
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetailsApi(id)
      .then((res) => {
        setProduct(res.data.product);
        setProductquantity(res.data.product.quantity); 
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details. Please try again.");
      });

    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData);
  }, [id]);

  const handleRentNow = (e) => {
    e.preventDefault();
    
    if (!userData) {
      toast.error("Please log in first.");
      navigate("/login"); // Redirect to login page
      return;
    }

    if (!product) {
      toast.error(
        "Product details not loaded. Please wait or refresh the page."
      );
      return;
    }

    const rentalPrice = parseFloat(product.productPrice);
    const totalPrice = rentalPrice * quantity;

    const formData = new FormData();
    formData.append("userID", userData._id);
    formData.append("productid", id);
    formData.append("totalPrice", totalPrice);
    formData.append("quantity", quantity);
    formData.append("Productname", product.productName);
    formData.append("productimage", product.productImageUrl);

    addToCartApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          const cartItem = {
            productid: {
              _id: id,
              productName: product.productName,
              productPrice: product.productPrice,
              productImageUrl: product.productImageUrl,
              productquantity: product.quantity,
            },
            totalPrice,
            quantity,
          };
          const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
          localStorage.setItem(
            "cart",
            JSON.stringify([...currentCart, cartItem])
          );
          navigate("/review"); // Redirect to cart or shipping page
        }
      })
      .catch((err) => {
        toast.error("Failed to add item to cart. Please try again.");
        console.error("Error adding to cart:", err);
      });
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < product.productquantity) {
        return prevQuantity + 1;
      } else {
        toast.warning('Please check the number of quantity available and choose');
        return prevQuantity;
      }
    });
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <style>
        {`
          .image-container {
            flex: 1;
            overflow: hidden;
            max-width: 400px; 
            height: 500px; 
          }
          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover; 
          }
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            padding: 10px 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .navbar a {
            text-decoration: none;
            color: #333;
            margin: 0 10px;
            font-size: 16px;
          }
          .welcome {
            background-color: #f0f0f0;
            padding: 10px 20px;
            border-radius: 5px;
          }
          .product-details-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background-color: #f4f4f4;
            min-height: 100vh;
          }
          .product-details-content {
            display: flex;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 80%;
            max-width: 1000px;
          }
          .details-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          .details-container h2 {
            margin-top: 0;
          }
          .details-container p {
            margin: 10px 0;
            line-height: 2.9;
          }
          .details-container button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            outline: none;
          }
          .details-container button:hover {
            background-color: black;
          }
          .quantityAdd-button:hover {
            background-color: gray; /* Change to gray on hover */
            color: white; /* Change text color */
          }
        `}
      </style>
      <Navbar />
      <div className="product-details-container">
        <div className="product-details-content">
          <div className="image-container">
            <img src={product.productImageUrl} alt={product.productName} />
          </div>
          <div className="details-container">
            <h2>{product.productName}</h2>
            <p>Rent Rs: {product.productPrice} per day</p>
            <p>{product.productDescription}</p>
            <div
              className="quantity-contained"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                onClick={handleDecrease}
                className="quantityAdd-button"
                style={{ marginRight: "5px" }}
              >
                -
              </button>
              <input
                style={{
                  color: "#9A5865",
                  border: "none",
                  textAlign: "center",
                  width: "50px",
                }}
                className="quantity-display"
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                type="number"
                name="Quantity"
                id="Quantity"
                value={quantity}
                min="1"
                max={product.productquantity}
              />
              <button
                onClick={handleIncrease}
                className="quantityAdd-button"
                style={{ marginLeft: "5px" }}
              >
                +
              </button>
            </div>
            <br />
            <button onClick={handleRentNow}>Rent Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

