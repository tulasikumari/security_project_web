import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";
import "../style/profile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("handleUpdateProfile called");

    const data = {
      oldemail: localStorage.getItem("email"),
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    console.log("Update Profile Data:", data);

    try {
      const response = await loginUserApi(data);
      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        // Optionally update local storage or any other logic based on the response
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleUpdateProfile} className="profile-form">
        <div className="form-group">
          <label htmlFor="FirstName">First firstName:</label>
          <input
            type="text"
            id="FirstName"
            value={userData.firstName || ""}
            onChange={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                firstName: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last jbdjabdasdName:</label>
          <input
            type="text"
            id="LastName"
            value={userData.lastName || ""}
            onChange={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                lastName: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email sucks:</label>
          <input
            type="email"
            id="email"
            value={userData.email || ""}
            onChange={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={userData.password || ""}
            onChange={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                password: e.target.value,
              }))
            }
          />
        </div>
        <button
          type="submit"
          className="update-button"
          onClick={() => console.log("Button clicked")}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;


// import React from "react";
// import Navbar from "../components/Navbar";

// const AboutUs = () => {
//   const features = [
//     // features are shown in image
//     {
//       title: "Quality",
//       description: "Each piece of furniture contains Quality.",
//       image:
//         "https://www.farreachinc.com/wp-blog-images/2014/03/quality-assurance-testing.png",
//     },
//     {
//       title: "Fast Delivery",
//       description: "We provide fast delivery.",
//       image:
//         "https://th.bing.com/th/id/R.0d25490bd7679dd80c4f146a9fe8a4ae?rik=yHc7E2yBr%2fX6Qw&pid=ImgRaw&r=0",
//     },
//     {
//       title: "Price",
//       description:
//         "We provide low prices compared to others and offer furniture options for every room in your home or office.",
//       image:
//         "https://th.bing.com/th/id/OIP.EeN431HlpgOFFSUc0hRCUQHaHa?rs=1&pid=ImgDetMain",
//     },
//     // Add images for other features
//   ];

//   return (
//     <>
//       <style>
//         {`
//    .container {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//   }
  
//   .text {
//     flex: 1;
//   }
  
//   .image {
//     flex: 1;
//     text-align: right;
//     margin-left: 20px; /* Adjust as needed */
//   }
  
//   .image img {
//     max-width: 100%;
//     height: auto;
//   }
  
//   `}
//       </style>
//       <Navbar />
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <main>
//         <div class="container">
//           <div class="text">
//             <p>
//               ndulge in our carefully curated collection, designed to add a
//               touch of glamour to every moment. From exquisite necklaces to
//               dazzling earrings and captivating bracelets, our selection
//               promises to complement your unique style and amplify your presence
//               with timeless grace. Whether you're preparing for a special event,
//               a romantic evening, or simply seeking to elevate your everyday
//               attire, [Your Rental Jewelry Business Name] offers the perfect
//               solution. With the flexibility of rental, you can effortlessly
//               access the luxury of choice without compromise. Experience the joy
//               of adorning yourself with exquisite jewels, knowing that each
//               piece has been chosen to inspire confidence and elevate your
//               allure. Welcome to a world where elegance knows no bounds. Welcome
//               to [Your Rental Jewelry Business Name], where every moment is
//               adorned with sophistication and style.
//             </p>
//           </div>
//           <div class="image">
//           <img
//           src="https://i.pinimg.com/originals/af/eb/58/afeb588110475e7ad06ed66ff596ac81.jpg"
//           alt="Introduction"
//           style={{ height: "400px", width: "80%", borderRadius: "10px" }}
//         />
//         </div>
//          </div>
//       </main>
      

//       <div className="container">
//         <br></br>
//         <br></br>
//         <br></br>
//         <h2>About Us</h2>
//         <p>
//           Welcome to our DecorEase, where we bring style and comfort to your
//           home. At DecorEase, we believe that every piece of furniture tells a
//           unique story and adds character to your space.
//         </p>

//         <div className="rounded border p-3">
//           {/* <h2>Contact Details</h2> */}
//           <p>Email: homedecore@email.com</p>
//           <p>Phone: 9874561230</p>
//           <p>Location: NewRoad,Kathmadu</p>
//         </div>
//         <br></br>

//         <div className="rounded border p-4 mb-4">
//           {/* Box or container with rounded corners, border, and padding */}
//           <div className="row">
//             {features.map((feature, index) => (
//               <div key={index} className="col-md-4 mb-4">
//                 {/* Each feature in a separate grid */}
//                 <div className="feature mb-4">
//                   <img
//                     src={feature.image}
//                     alt={feature.title}
//                     className="img-fluid"
//                     style={{ height: "200px", width: "95%" }}
//                   />
//                   <hr></hr>
//                   <h3>{feature.title}</h3>
//                   <p>{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AboutUs;

