import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// updateEditApi
import {  updateEditApi } from '../../apis/Api'
const AdminEditUser = () => {
  // receive product id from url
  const { id } = useParams();

  // navigator
  const navigate = useNavigate();

  // use effect to fetch product details
  useEffect(() => {
    // API call
    getSingleUserApi(id).then((res) => {
      console.log(res.data);
      setemail(res.data.email);
      setfirstName(res.data.firstname);
      setlastName(res.data.lastname);
      
    });
  }, [id]);

  // make useState
  // const [username, setProductNam] = useState('')
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");

  // // Make useState for image
  // // const [productImage, setProductImage] = useState(null)
  // // const [previewImage, setPreviewImage] = useState(null)
  // // const [oldImage, setOldImage] = useState('')

  // //  handle image upload
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0]
  //   setProductImage(file)
  //   setPreviewImage(URL.createObjectURL(file))
  // }

  // make function for button
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email);
    console.log(firstName);
    console.log(lastName);
    console.log(email);

    // make a form data
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);

    // Making Api Call
    updateEditApi(id, formData)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          navigate("/admin/dashboard");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  return (
    <>
      <h2 className="m-4">
        Updating product for{" "}
        <span className="text-danger">'{productName}'</span>
      </h2>
      <div className="d-flex m-4 gap-4">
        <div className="">
          <form>
            <label>Product Name</label>
            <input
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              type="text"
              className="form-control mb-2"
              placeholder="Enter first name"
            />

            <label>Product Price</label>
            <input
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              type="number"
              className="form-control mb-2"
              placeholder="Enter last price"
            />

            {/* <label>Product Category</label>
            <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control mb-2'>
              <option value="Flower">Flower</option>
              <option value="Cake">Cake</option>
              <option value="Gift">Gift</option>
            </select> */}

            <label>Product Description</label>
            <textarea
              value={email}
              onChange={(e) => setemail(e.target.value)}
              name=""
              id=""
              cols="3"
              rows="3"
              className="form-control"
              placeholder="Enter email"
            ></textarea>

            {/* <label>Product Image</label>
            <input onChange={handleImageUpload} type="file" className='form-control mb-2' /> */}

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-2"
            >
              Update product
            </button>
          </form>
        </div>
        {/* <div>
            <h6>Old Image</h6>
            <img src={oldImage} className='object-fit-cover rounded-3' height={180} width={180} alt="" />
            <hr />
            {
              previewImage && <>
                  <h6 className='mt-3'>New Image</h6>
                  <img src={previewImage} className='object-fit-cover rounded-3' height={180} width={180} alt="" />
              </>
            }
        </div> */}
      </div>
    </>
  );
};

export default AdminEditUser;
