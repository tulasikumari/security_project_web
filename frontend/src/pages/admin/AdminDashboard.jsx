// import React, { useState, useEffect } from "react";
// import {
//   createProductApi,
//   deleteProductApi,
//   getAllProductsApi,
// } from "../../apis/Api";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// import Sidebar from "./sidebar";

// const AdminDashboard = () => {
//   // make useState
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productCategory, setProductCategory] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productquantity,setproductquantity]=useState("");

//   // Make useState for image
//   const [productImage, setProductImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   // useEffect for fetching all products and show in table
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     getAllProductsApi().then((res) => {
//       setProducts(res.data.products);
//       console.log(products);
//     });
//   }, []);

//   // Function for image upload and preview\
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setProductImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   // handle submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Making logical form data
//     const formData = new FormData();
//     formData.append("productName", productName);
//     formData.append("productPrice", productPrice);
//     formData.append("productCategory", productCategory);
//     formData.append("productDescription", productDescription);
//     formData.append("productImage", productImage);
//     formData.append("productquantity,productquantity");

//     // Making API Call
//     createProductApi(formData)
//       .then((res) => {
//         if (res.data.success == false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//         }
//       })
//       .catch((err) => {
//         toast.error("Server Error");
//         console.log(err.message);
//       });
//   };

//   // delete product Function
//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to delete this product?"
//     );
//     if (!confirmDialog) {
//       return;
//     } else {
//       // make api call
//       deleteProductApi(id).then((res) => {
//         if (res.data.success == true) {
//           window.location.reload();
//           toast.success(res.data.message);
//         } else {
//           toast.error(res.data.message);
//         }
//       });
//     }
//   };
//   const handleClick = () => {
//     // Handle your navigation logic here
//     window.location.href = "/usertable"; // Replace with the desired URL
//   };
//   const handleClick123 = () => {
//     // Handle your navigation logic here
//     window.location.href = "/contacttable"; // Replace with the desired URL
//   };
//   const handleClick1234 = () => {
//     // Handle your navigation logic here
//     window.location.href = "/table"; // Replace with the desired URL
//   };

//   return (
//     <>

//      <Sidebar />

//      <div className="main-content" style={{ marginLeft: "250px", padding: "20px", marginTop:"80px"}}>
//         <div className="d-flex justify-content-between">
//           <h2>Admin Dashboard</h2>

//           <button
//             type="button"
//             className="btn btn-danger"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal"
//           >
//             Add Product
//           </button>
//           {/* <button type="button" onClick={handleClick}>
//             User
//           </button>
//           <button type="button" onClick={handleClick123}>
//             Contact
//           </button>
//           <button type="button" onClick={handleClick1234}>
//             order
//           </button> */}

//           <div
//             className="modal fade"
//             id="exampleModal"
//             tabindex="-1"
//             aria-labelledby="exampleModalLabel"
//             aria-hidden="true"
//           >
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5" id="exampleModalLabel">
//                     Create new product!
//                   </h1>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <form>
//                     <label>Product Name</label>
//                     <input
//                       onChange={(e) => setProductName(e.target.value)}
//                       type="text"
//                       className="form-control mb-2"
//                       placeholder="Enter product name"
//                     />

//                     <label>Product Price</label>
//                     <input
//                       onChange={(e) => setProductPrice(e.target.value)}
//                       type="number"
//                       className="form-control mb-2"
//                       placeholder="Enter product price"
//                     />
//                     <label>Product Price</label>
//                     <input
//                       onChange={(e) => setproductquantity(e.target.value)}
//                       type="number"
//                       className="form-control mb-2"
//                       placeholder="Enter product quantity"
//                     />

//                     <label>Product Category</label>
//                     <select
//                       onChange={(e) => setProductCategory(e.target.value)}
//                       className="form-control mb-2"
//                     >
//                       <option value="Accessories"> Accessories</option>
//                       <option value="Sofa">Bridal Jewelery</option>
//                       <option value="Chair">Engagement Jewelery</option>
//                     </select>

//                     <label>Product Description</label>
//                     <textarea
//                       onChange={(e) => setProductDescription(e.target.value)}
//                       name=""
//                       id=""
//                       cols="3"
//                       rows="3"
//                       className="form-control"
//                       placeholder="Enter description"
//                     ></textarea>

//                     <label>Product Image</label>
//                     <input
//                       onChange={handleImageUpload}
//                       type="file"
//                       className="form-control mb-2"
//                     />

//                     {previewImage && (
//                       <img
//                         src={previewImage}
//                         className="img-fluid rounded object-fit-cover"
//                         alt="product Image"
//                       />
//                     )}
//                   </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     type="button"
//                     className="btn btn-primary"
//                   >
//                     Save changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <table className="table mt-2">
//           <thead className="table-dark">
//             <tr>
//               <th>Product Image</th>
//               <th>Product Name</th>
//               <th>Product Price</th>
//               <th>Product Category</th>
//               <th>Product Description</th>
//               <th>Product Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((item) => (
//               <tr>
//                 <td>
//                   <img
//                     src={item.productImageUrl}
//                     width={"40"}
//                     height={"40"}
//                     alt=""
//                   />
//                 </td>
//                 <td>{item.productName}</td>
//                 <td>NPR.{item.productPrice}</td>
//                 <td>{item.productCategory}</td>
//                 <td>{item.productDescription.slice(0, 10)}</td>
//                 <td>
//                   <div className="btn-group" role="group">
//                     <Link
//                       to={`/admin/edit/${item._id}`}
//                       className="btn btn-dark"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="btn btn-danger"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* </div> */}
//     </>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
} from "../../apis/Api";

import Sidebar from "./sidebar";

const AdminDashboard = () => {
  // make useState
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productquantity, setproductquantity] = useState("");

  // Make useState for image
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // useEffect for fetching all products and show in table
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
      console.log(products);
    });
  }, []);

  // Function for image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Making logical form data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);
    formData.append("productquantity", productquantity); // Corrected this line

    // Making API Call
    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  // delete product Function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDialog) {
      return;
    } else {
      // make api call
      deleteProductApi(id).then((res) => {
        if (res.data.success === true) {
          window.location.reload();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };
  const handleClick = () => {
    // Handle your navigation logic here
    window.location.href = "/usertable"; // Replace with the desired URL
  };
  const handleClick123 = () => {
    // Handle your navigation logic here
    window.location.href = "/contacttable"; // Replace with the desired URL
  };
  const handleClick1234 = () => {
    // Handle your navigation logic here
    window.location.href = "/table"; // Replace with the desired URL
  };

  return (
    <>
      <Sidebar />

      <div
        className="main-content"
        style={{ marginLeft: "250px", padding: "20px", marginTop: "80px" }}
      >
        <div className="d-flex justify-content-between">
          <h2>Admin Dashboard</h2>

          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>
          {/* <button type="button" onClick={handleClick}>
            User
          </button>
          <button type="button" onClick={handleClick123}>
            Contact
          </button>
          <button type="button" onClick={handleClick1234}>
            order
          </button> */}

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create new product!
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <label>Product Name</label>
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter product name"
                    />
                    <label>Product Price</label>
                    <input
                      onChange={(e) => setProductPrice(e.target.value)}
                      type="number"
                      className="form-control mb-2"
                      placeholder="Enter product price"
                    />
                    <label>Product Quantity</label> {/* Updated label text */}
                    <input
                      onChange={(e) => setproductquantity(e.target.value)} // Corrected setter function
                      type="number"
                      className="form-control mb-2"
                      placeholder="Enter product quantity"
                    />
                    <label>Product Category</label>
                    <select
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="form-control mb-2"
                    >
                      <option value="Accessories">Accessories</option>
                      <option value="Sofa">Bridal Jewelry</option>
                      <option value="Chair">Engagement Jewelry</option>
                    </select>
                    <label>Product Description</label>
                    <textarea
                      onChange={(e) => setProductDescription(e.target.value)}
                      name=""
                      id=""
                      cols="3"
                      rows="3"
                      className="form-control"
                      placeholder="Enter description"
                    ></textarea>
                    <label>Product Image</label>
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      className="form-control mb-2"
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        className="img-fluid rounded object-fit-cover"
                        alt="product Image"
                      />
                    )}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Description</th>
              <th>Product Quantity</th>
              <th>Action</th> {/* Added Product Quantity */}
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.productImageUrl}
                    width={"40"}
                    height={"40"}
                    alt=""
                  />
                </td>
                <td>{item.productName}</td>
                <td>NPR.{item.productPrice}</td>
                <td>{item.productCategory}</td>
                <td>{item.productDescription.slice(0, 10)}</td>
                <td>{item.productquantity}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link
                      to={`/admin/edit/${item._id}`}
                      className="btn btn-dark"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
