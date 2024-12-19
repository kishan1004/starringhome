import { axiosInstance, userAuthInstance } from "../utils/axios";

export const userLogin = (userName, password) => {
    return axiosInstance.post('user/login', {
        userName:userName,
        password:password
    })
}

/* User Management */

/* IMP: CHANGES NEEDED HERE !!
 * User logout ui feature not available, so handled token removal over here.
 * Once ui feature is done, remove .then and handle it on the ui component.
 */
export const userLogout = async () => {
    return axiosInstance.delete('user/logout')
}

export const checkUserName = (userName) => {
    return axiosInstance.get(`/users/profiles/check/${userName}`);
}

export const otpVerification = (data) => {
    const { verificationType, actionType, userName, otpCode } = data;
    return axiosInstance.put('/users/profiles/otp/verification', data);
}

export const userSignup = (data) => {
    const { userName, password } = data;
    return axiosInstance.post('/users/profiles/signup', {
        userName,
        password
    });
}

export const updateUsername = (userName)=>{
    return axiosInstance.post('/users/profiles/change/username', {userName});
}

//get category
export const getCategoryApi = () =>{
    return axiosInstance.get('/admin/category/names')
}

//Orders Management
export const newarrivalProducts = ()=>{
    return axiosInstance.get(`/users/orders/products?page=1&limit=4`)
}
export const userProductsList = (currentPage,searchText,filterData) => {
    let url = `/users/orders/products?page=${currentPage}&limit=20&price_gt=${filterData.pricegt}&price_lt=${filterData.pricelt}`
    if(searchText !== ''){
        url = url + `&name=${searchText}`
    }
    if(filterData.sizes !== ''){
        url = url + `&name=${filterData.sizes}`
    }
    if(filterData.categories.length > 0){
      url = url + filterData.categories.map((list)=>{
            return `&category=${list}`
        }).join('')
    }

    if(filterData.tags.length > 0){
          url = url + filterData.tags.map((list)=>{
            return `&tags=${list}`
        }).join('')
    }
   
      if(filterData.collections.length > 0){
          url = url + filterData.collections.map((list)=>{
            return `&collections=${list}`
        }).join('')
    }

    if(filterData.ratings.length > 0){
          url = url + filterData.ratings.map((list)=>{
            return `&ratings=${list}`
        }).join('')
    } 
    return axiosInstance.get(url);
}

export const getProductById = (id) => {
   return axiosInstance.get(`/users/orders/products/${id}/view`);
}

export const getUserDetails = ()=>{
   return axiosInstance.get(`/users/profiles/details`);

}

export const getMyOrdersProducts = () => {
    return userAuthInstance.get('/users/orders/details');
}
export const getOrdersDetailById = (id) => {
    return userAuthInstance.get(`/users/orders/${id}/details`);
}

export const addFavouriteProduct = (data) => {
    return userAuthInstance.put('/users/orders/products/favourites', data.data)
}

export const getAllFavourites = (page = 1, limit = 20) => {
    return axiosInstance.get(`/users/orders/products/favourites/details?page=${page}&limit=${limit}`);
}

export const addToCart = (data) => {
  return userAuthInstance.put('/users/orders/products/add/to/cart', data.data)
}

export const getCartDetails = () => {
    return userAuthInstance.get('/users/orders/products/cart/details')
}

export const proceedToPay = (data) => {
    return userAuthInstance.post('/payments/proceed/to/pay',data)
}

export const verifyPayment = (data) =>{
    return userAuthInstance.post('/payments/verify', data);
}

export const updatePassword = (currentPassword,newPassword)=>{
    return axiosInstance.patch('/users/profiles/password/reset',{
        currentPassword,
        newPassword
    })
}


export const forgotPassword = (userName) => {
    return axiosInstance.post('/users/profiles/pasword/forgot',{
        userName:userName.userName,
        newPassword:userName.newPassword
    },
    {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("userToken")}`
        }
    }
)
}


export const getAddresses = ()=>{
    return axiosInstance.get('/users/profiles/address');
}


export const addAddress = (data)=>{
    let url = '/users/profiles/address/save/update'

    if(data.id !== 'new'){
        url = url + `?address_id=${data.id}`
    }
    return userAuthInstance.put(url,data.data)
}


export const deleteAddress = async(data)=>{
  
    return await axiosInstance.delete('users/profiles/adddress/remove',data)
    }


export const getUserNotifications =async ()=>{
    return axiosInstance.get('/users/profiles/notifications');
}

export const clearNotificationsUser = () =>{
    const token = localStorage.getItem("authToken");
  
    return axiosInstance.delete("/users/profiles/notificaions/clear", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}

export const getOtp =async(data)=>{
    return axiosInstance.put('/users/profiles/otp/verification',data,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("userToken")}`
        }
    });
}

export const salesOverviewSave = async (platform)=>{
    return axiosInstance.patch('/dashboard/user/traffic/overview/sales',{platform});
}


export const buyProducts=(data) => {
    return userAuthInstance.post('/users/orders/buy', data);
    
}

export const proceedPaymentApi =async (orderId, amt) => {
    return axiosInstance.post('/payments/proceed/to/pay', {
        orderID: orderId,
        amt: amt*100
    });
}

export const getTestimonialApi = ()=>{
 return axiosInstance.get(`users/orders/testimonials?page=1&limit=15`)
}

export const viewCouponsApi = ()=>{
    return userAuthInstance.get('/users/orders/view/coupons')
}
export const updateReturnApi = (data)=>{
    return userAuthInstance.post('/users/orders/return/exchange',data)
}