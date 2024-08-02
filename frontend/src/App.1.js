import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import ProductDetails from "./pages/Productdetails";
import Register from "./pages/Register";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditProduct from "./pages/admin/AdminEditProdut";
import { UserTable } from "./pages/admin/UserTable";
import Cart from "./pages/admin/cart";
import { ContactTable } from "./pages/admin/contact";
import ChangePassword from "./pages/changepassword";
import UserProfileview from "./pages/profile";

export function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        {/* <Route path='/' element={<Dashboard/>}/>  */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile" element={<UserProfileview />} />

        {/* Admin routes */}
      

        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordertable" element={<ordertable />} />

        {/* <Route path="/viewproduct" element={<ProductDetails />} /> */}

        <Route path="/viewproduct/:id" element={<ProductDetails />} />
      </Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/contacttable" element={<ContactTable />} />
      {/* <Footer /> */}
    </Router>
  );
}
