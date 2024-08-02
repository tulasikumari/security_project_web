import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import UserProfileview from "./pages/profile";
import Register from "./pages/Register";

// for showing toast messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./pages/Aboutus";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditProduct from "./pages/admin/AdminEditProdut";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// ./pages/admin/AdminEditProduct

import Cart from "./pages/admin/cart";
import { ContactTable } from "./pages/admin/contact";
// import { OrderTable } from "./pages/admin/order";
import BlogPage from "./pages/Blog";
import BookingForm from "./pages/BookingForm";
import ChangePassword from "./pages/changepassword";
import EditShippingInfo from "./pages/editbooking";
import FAQ from "./pages/faq";
import LocationEntry from "./pages/location";
import Paymentsinof from "./pages/payment";
import PrivacyPolicy from "./pages/privicyandpolicy";
import ProductDetails from "./pages/Productdetails";
import ProductGrid from "./pages/ProductGrid";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import AddToCart from "./pages/rewviewpage";
import ServicePage from "./pages/services";
import ShippingForm from "./pages/shippingForm";
import ShippingInfoPage from "./pages/shoopingbag";
import Sliding from "./pages/sliding";
import PaymentSuccess from "./pages/sucess";
import TermsAndConditions from "./pages/termandcondition";
import MyOrders from "./pages/userorder";
import OrderTable from "./pages/admin/order";
import { UserTable } from "./pages/admin/UserTable";
import OrderHistory from "./pages/admin/OrderHistory";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/siding" element={<Sliding />}></Route>
        <Route path="/homepage" element={<Homepage />} />
        {/* <Route path='/' element={<Dashboard/>}/>  */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ServicePage" element={<ServicePage />} />
        <Route path="/BlogPage" element={<BlogPage />} />
        <Route path="/ProductGrid" element={<ProductGrid />} />

        <Route path="/location-entry" element={<LocationEntry />} />

        <Route path="/profile" element={<UserProfileview />} />
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/contacttable" element={<ContactTable />} />

        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/table" element={<table />} /> */}
        <Route path="/faq" element={<FAQ />} />
        {/* <Route path="/faqtable" element={<FAQTable />} />  */}

        {/* <Route path="/viewproduct" element={<ProductDetails />} /> */}

        <Route path="/viewproduct/:id" element={<ProductDetails />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/Privacy policy" element={<PrivacyPolicy />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/ship" element={<ShippingForm />} />

        {/* <Route path="/ordertable" element={<OrderTable />} /> */}

        <Route path="/order" element={<MyOrders />} />

        <Route path="/editbooking" element={<EditShippingInfo />} />

        <Route path="/review" element={<AddToCart />} />

        <Route path="/ShippingInfoPage" element={<ShippingInfoPage />} />
        <Route path="/payment" element={<Paymentsinof />} />
        <Route path="/success" element={<PaymentSuccess />} />

        <Route path="/adminorder" element={<OrderTable />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />



        {/* ShoppingBag */}

        {/* AddToCart */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
