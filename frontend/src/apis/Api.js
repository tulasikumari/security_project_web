import axios from "axios";

const Api = axios.create({
  baseURL: "https://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const token = localStorage.getItem("token");
const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};
export const testApi = () => Api.get("/test");
// http://localhost:5000/test

// create user api
export const createUserApi = (data) => Api.post("/api/user/create", data);

export const changePasswordApi = (data) =>
  Api.post("/api/user/changepassword", data);

// Login user Api
export const loginUserApi = (data) => Api.post("/api/user/login", data);

export const resetPasswordApi = (data) => Api.post("/api/user/reset", data);

export const forgetpassword = (email) =>
  Api.post("/api/user/forgetPassword", email);

export const VerifyOtp = () => Api.post("/api/user/verifyOTP");

// Create product API
export const createProductApi = (data) =>
  Api.post("/api/product/create_product", data, config);

export const createcontact = (data) =>
  Api.post("/api/admin/createcontact", data);

// get all products
// export const getAllProductsApi = () => Api.get('/api/product/get_products')
export const getAllProductsApi = () => Api.get("/api/product/get_products");

// GET single product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_product/${id}`);

// export const getProductDetailsApi=(id)=> Api.get(`/api/product/getProductDetailsApi/:id/${id}`)

export const getProductDetailsApi = (id) =>
  Api.get(`/api/product/getProductDetailsApi/${id}`);

// Update product API with ID
export const updateProductApi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config);

// delete product API with
export const deleteProductApi = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);

// Change the parameter to accept an object
export const create_order = (orderData) =>
  Api.post(`/api/product/create_order`, orderData, config);

// /api/createorder

// export const create_order = () => Api.get("/api/product/create_order");

// export const  getallorderapi= (id) => Api.get(`/api/product/get_order/${id}`);

// export const getAllUserorderApi=(id)=> Api.get(`/api/product/get_order/${id}`);

// get all user
export const getAllUserApi = () => Api.get("/api/admin/getAllUser");

export const getAllContact = () => Api.get("/api/admin/getAllContact");

export const updateuser = (data) => Api.post("/api/user/updateuser", data);

// export const updateUserDataApi = (formData) =>
//   Api.post('/api/user/updateuser', formData, config);

export const updateUserDataApi = async (formData) => {
  try {
    const response = await axios.post(
      "https://localhost:5000/api/user/updateuser",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// delete user by email
// export const deleteUserByEmail=(data) => Api.delete('api/admin/deleteUser')

//export const deleteUserById = (Id) => Api.delete(`/api/admin/deleteUser/${Id}`);

export const deleteUserById = (Id) => {
  const apiUrl = `/api/admin/deleteUser/${Id}`;

  console.log("API URL:", apiUrl);

  return Api.delete(apiUrl);
};

export const deleteContactById = (Id) => {
  const apiUrl = `/api/admin/deleteContact/${Id}`;

  console.log("API URL:", apiUrl);

  return Api.delete(apiUrl);
};

export const getSingleUserApi = () => Api.get("/api/admin/getUser");
// updateEditApi
export const updateEditApi = (id) =>
  Api.put(`/api/admin/updateUser/${id}`, config);

export const getAllUserApis = (page, perPage) => {
  return axios.get(`/api/getAllUsers?page=${page}&perPage=${perPage}`);
};

// cart api
//Add to cart api
console.log(config + "config");
export const addToCartApi = (cartData) =>
  Api.post("/api/cart/addToCart", cartData, config);
export const getCartByUserIDApi = (userID) =>
  Api.get(`/api/cart/getCartByUserID?userID=${userID}`, config);
export const getSingleCartApi = (userID) =>
  Api.get(`/api/cart/getSingleCart/${userID}`, config);
export const updateCartApi = (id, formData) =>
  Api.put(`/api/cart/updateCart/${id}`, formData, config);
export const removeFromCartApi = (id) =>
  Api.delete(`/api/cart/removeFromCart/${id}`, config);

//Booking
export const submitBooking = (data) =>
  Api.post("/api/user/submit-booking", data, config);

export const getBookingsByUserId = (id) =>
  Api.get(`/api/user/get_bookingbyUser/${id}`, config);

export const deleteBookings = (id) =>
  Api.delete(`/api/admin/delete_booking/${id}`, config);

export const getAllBookings = (id) =>
  Api.get("/api/admin/get_bookings", config);
export const updateBookingStatusApi = (bookingId, data) =>
  Api.put(`/api/user/updateStatus/${bookingId}`, data, config);

export const createShippingInfoApi = (data) =>
  Api.post("/api/ship/createShippingInfo", data, config);
export const getShippingInfoByUserIDApi = (id) =>
  Api.get(`/api/user/getShippingInfoByUserID/${id}`, config);
export const getSingleShippingInfoApi = (id) =>
  Api.get(`/api/user/getSingleShippingInfo/${id}`);
export const updateShippingInfoApi = (id, formData) =>
  Api.put(`/api/user/updateShippingInfo/${id}`, formData, config);

// Shopping Bag
// export const addToShoppingBagApi = (data) => Api.post('/api/shoppingBag/addToShoppingBag', data, config)
// export const getShoppingBagByUserIDApi = (id) => Api.get(`/api/shoppingBag/getShoppingBagByUserID/${id}`, config)
// export const getSingleShoppingBagApi = (id) => Api.get(`/api/shoppingBag/getSingleShoppingBag/${id}`)
// export const updateShoppingBagApi = (id, formData) => Api.put(`/api/shoppingBag/updateShoppingBag/${id}`, formData, config)
// export const removeFromShoppingBagApi = (id) => Api.delete(`/api/shoppingBag/removeFromShoppingBag/${id}`, config)


// order
export const createOrderApi = (data) =>
  Api.post("/api/user/createOrder", data, config);
export const getOrderByUserIDApi = (id) =>
  Api.get(`/api/user/getOrderByUserID/${id}`, config);
export const getAllOrdersApi = () => Api.get("/api/user/getAllOrders");
export const updateOrderStatusApi = (id, formData) =>
  Api.put(`/api/admin/updateOrderStatus/${id}`, formData, config);
export const cancelOrderApi = (id) =>
  Api.delete(`/api/user/cancelOrder/${id}`, config);
export const searchItemsByName = async (itemName, categoryName, categoryId) => {
  try {
    const response = await axios.get("/api/user/search", {
      params: {
        itemName,
        categoryName,
        categoryId, // Pass categoryId if available
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateOrderStatu = async (id, formData, config) => {
  try {
    const response = await Api.put(`/api/admin/updateOrderStatus/${id}`, formData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await axios.get('/api/admin/users'); // Make request to backend
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
export const getAuditLogs = async () => {
  try {
    const response = await axios.get('/api/audit-logs'); // Make request to the backend to fetch audit logs
    return response.data;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};

// export const logoutApi = () => {
//   return Api.post('/api/user/logout', {}, { withCredentials: true });
// };

// // Example API call to check if the session is still valid
// export const checkSessionApi = () => {
//   return Api.get('/api/user/check-session', { withCredentials: true });
// };

// export const addToCartApis = (cartData) => Api.post(`/api/cart/add_to_cart`, cartData, config);
//   export const removeFromCartApi = (id) => Api.delete(`/api/cart/deleteCart/${id}`, config);
// export const getCartApi = (userId) => Api.get(`/api/cart/getcart/${userId}`, config);
// export const checkoutCartApi = (userId) => Api.post(`/api/cart/checkout/${userId}`, config);
// export const updateCartQuantityApi = (cartData) => Api.put(`/api/cart/updateCartQuantity`, cartData, config);
// // export const clearCartApi = (userId) => Api.delete(`/api/cart/clearCart/${userId}`, config);

// const API_BASE_URL = 'http://localhost:5000/api';

// export const clearCartApi = (userId) => {
//   return axios.post(`${API_BASE_URL}/cart/clearCart/${userId}`);
// };

// export const removeFromCartApi = (cartData) =>
//   Api.post(`/api/cart/deleteCart`, cartData, config);

// export const getCartApi = (userId) =>
//   Api.get(`/api/cart/get_cart/${userId}`, config);

// export const checkoutCartApi = (userId) =>
//   Api.post(`/api/cart/checkout_cart/${userId}`, config);

