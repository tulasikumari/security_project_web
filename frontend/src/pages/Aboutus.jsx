import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import about from '../images/logode.png';
import abou1 from '../images/about1.png';
import long from '../images/long.png';
import short from '../images/short.png';

const AboutUs = () => {
  const features = [
    {
      title: "Quality",
      description: "Each piece of furniture contains Quality.",
      image: "https://www.farreachinc.com/wp-blog-images/2014/03/quality-assurance-testing.png",
    },
    {
      title: "Fast Delivery",
      description: "We provide fast delivery.",
      image: "https://th.bing.com/th/id/R.0d25490bd7679dd80c4f146a9fe8a4ae?rik=yHc7E2yBr%2fX6Qw&pid=ImgRaw&r=0",
    },
    {
      title: "Price",
      description: "We provide low prices compared to others and offer furniture options for every room in your home or office.",
      image: "https://th.bing.com/th/id/OIP.EeN431HlpgOFFSUc0hRCUQHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  const teamMembers = [
    {
      name: "Sara",
      role: "Co-Founder",
      image: "https://th.bing.com/th/id/OIP.jLEKtP8ptimHLH0-hxTL0QHaKo?w=740&h=1062&rs=1&pid=ImgDetMain",
    },
    {
      name: "David",
      role: "Co-Founder",
      image: "https://th.bing.com/th/id/OIP.tZ98LGTSsnsCvhdGp6Ll3wHaE8?rs=1&pid=ImgDetMain",
    },
    {
      name: "Emily",
      role: "Lead Designer",
      image: "https://i.pinimg.com/originals/05/3a/05/053a056b9c026a01bffe45f1480acd8b.jpg",
    },
  ];

  const services = [
    {
      title: "Jewelry Rental",
      description: "Rent exquisite jewelry for any occasion without the commitment of ownership.",
      image: "https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-hanging-door-sign-board-with-text-png-image_4732854.png",
    },
    {
      title: "Home Delivery",
      description: "Customize your jewelry to match your unique style and preferences.",
      image: "https://zeevector.com/wp-content/uploads/Free-Home-Delivery-Logo-PNG@.png",
    },
    {
      title: "Easy to return",
      description: "We offer return services to keep your jewelry sparkling and makes the user easy.",
      image: "https://thumbs.dreamstime.com/b/easy-returns-sign-label-delivery-service-vector-stock-illustration-261431911.jpg",
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

  const renderServices = () => {
    return services.map((service, index) => (
      <div key={index} className="service">
        <img src={service.image} alt={service.title} />
        <h3>{service.title}</h3>
        <p>{service.description}</p>
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
            height: 300px;
            overflow: hidden;
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
            min-width: 300px;
            min-height: 450px;
          }

          .service img {
            height: 50px; /* Adjust the height of the services images */
            // object-fit: contain; /* Ensure images are contained within the specified height */
          }

          .team-member:hover, .service:hover {
            transform: scale(1.05);
          }

          .team-member h3, .service h3 {
            margin: 10px 0 5px;
            font-size: 18px;
            color: #333;
          }

          .team-member p, .service p {
            margin: 0;
            color: #666;
          }

          @media (max-width: 768px) {
            .team-member, .service {
              width: calc(50% - 10px);
            }
          }

          @media (max-width: 600px) {
            .container, .content-container {
              flex-direction: column;
              padding: 0 5%;
            }

            .team-member, .service {
              width: 200%;
              margin: 10px 0;
            }
          }
        `}
      </style>
      <Navbar />
      <main>
        <div className="image-container">
          <div className="overlay-text">
            <h1>About Us</h1>
          </div>
          <div className="image">
            <img
              src={abou1}
              alt="Introduction"
              style={{ height: "400px", width: "100%" }}
            />
          </div>
        </div>
      </main>
   
      <main>

        <div className="team-section">
          <h2>Meet Our Team</h2>
          {renderTeamMembers()}
        </div>
        <hr />
        <div className="services-section">
          <h2>Our Services</h2>
          {renderServices()}
        </div>
      </main>
      <br></br>
      <Footer />
    </>
  );
};

export default AboutUs;
