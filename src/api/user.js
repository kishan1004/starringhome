import axios from "axios";
import { axiosInstance } from "../utils/axios";

export const userLogin = (userName, password) => {
    return axiosInstance.post('user/login', {
        userName,
        password
    })
}

/* User Management */

/* IMP: CHANGES NEEDED HERE !!
 * User logout ui feature not available, so handled token removal over here.
 * Once ui feature is done, remove .then and handle it on the ui component.
 */
export const userLogout = async () => {
    return axiosInstance.delete('user/logout').then(res => {
        if (res.status === 200) {
            localStorage.removeItem("userToken");
        }
    })
}

export const checkUserName = (userName) => {
    return axiosInstance.get(`/users/profiles/check/${userName}`);
}

export const otpVerification = (data) => {
    const { verificationType, actionType, userName, otpCode } = data;
    return axiosInstance.put('/users/profiles/otp/verification', {
        verificationType,
        actionType,
        userName,
        otpCode
    });
}

export const userSignup = (data) => {
    const { userName, password } = data;
    return axiosInstance.post('/users/profiles/signup', {
        userName,
        password
    });
}

//Orders Management
export const userProductsList = (data) => {
    let queryParams = [];
    if (data?.page) {
        queryParams.push(`page=${data.page}`);
    }
    if (data?.page && data?.limit) {
        queryParams.push(`limit=${data.limit}`);
    }
    if (data?.sizes?.length > 0) {
        const temp = data.sizes.join('&sizes=')
        queryParams.push(`sizes=${temp}`);
    }
    if (data?.category?.length > 0) {
        const temp = data.category.join('&category=');
        queryParams.push(`category=${temp}`);
    }
    if (data?.price_gt) {
        queryParams.push(`price_gt=${data.price_gt}`);
    }
    if (data?.price_lt) {
        queryParams.push(`price_lt=${data.price_lt}`);
    }
    if (data?.collections?.length > 0) {
        const temp = data.collections.join('&collections=');
        queryParams.push(`collections=${temp}`);
    }
    if (data?.tags?.length > 0) {
        const temp = data.tags.join('&tags=');
        queryParams.push(`tags=${temp}`);
    }
    if (data?.ratings?.length > 0) {
        const temp = data.ratings.join('&ratings=');
        queryParams.push(`ratings=${temp}`);
    }

    const allParams = queryParams.length > 0 ? queryParams.join('&') : null;
    let url = 'users/orders/products';
    if (allParams) {
        url += `?${allParams}`;
    }
    return axiosInstance.get(url);
}

export const getProductById = (id) => {
    console.log("In api",id)
    if (!id) {
        console.error("Id is missing");
        return;
    }
    return axiosInstance.get(`/users/orders/products/${id}/view`);
}


export const getCartProducts = () => {
    return axiosInstance.get('/users/orders/details',
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("userToken")}`
            }
        }
    );
}
export const addFavouriteProduct = (id, action) => {
    if (!id) {
        console.error("Id required");
        return;
    }

    return axiosInstance.put('/users/orders/products/favourites', {
        productId: [...id],
        action
    })
}

export const getAllFavourites = (page = 1, limit = 20) => {
    return axiosInstance.get(`/users/orders/products/favourites/details?page=${page}&limit=${limit}`);
}
export const addToCart = (data) => {
    const { productId, action } = data;
    if (productId.length === 0) {
        console.error("Product array is empty");
        return;
    }
    if (!action) {
        console.error("Action is empty")
        return;
    }

    return axiosInstance.put('/users/orders/products/add/to/cart', {
        productId,
        action
    },
    {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem("userToken")}`
        }
    }
)

}

export const getCartDetails = (page, limit = 20) => {
    return axiosInstance.get('/users/orders/products/cart/details', {
        params: {
            page,
            limit
        }
    })
}

export const proceedToPay = (orderID, amt) => {
    return axiosInstance.post('/payments/proceed/to/pay', {
        orderId: orderID,
        amount: amt*100
    })
}

export const verifyPayment = ( razorpay_payment_id, razorpay_order_id, razorpay_signature) =>{
    return axiosInstance.post('/payments/verify', {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
    });
}

export const updatePassword = (currentPassword,newPassword)=>{
    console.log("In user function")
    return axiosInstance.patch('/users/profiles/password/reset',{
        currentPassword,
        newPassword
    })
}


export const forgotPassword = (userName) => {
    console.log("In forgot password",userName)
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
    console.log("in user file")
    return axiosInstance.get('/users/profiles/address');
}


export const addAddress = (firstName,
    lastName,
    email,
    mobileNumber,
    country,
    state,
    address,
    city,
    landmark,
    postalCode,
    isDefault,
    id)=>{
    console.log(firstName,
        lastName,
        email,
        mobileNumber,
        country,
        state,
        address,
        city,
        landmark,
        postalCode,
        isDefault,
        id)
    return axiosInstance.put('/users/profiles/address/save/update',
        {
            firstName,
            lastName,
            email,
            mobileNumber,
            country,
            state,
            address,
            city,
            landmark,   
            postalCode,
            isDefault
        },
        {
            ...(id !== "new" && { params: { address_id: id } })
        }
    )
}


export const deleteAddress = async(addressId)=>{
    console.log(addressId);
    const r = {addressId:addressId};
    console.log("swagger format",r);
    return await axiosInstance.delete('users/profiles/adddress/remove',{
                r
            }
    )
}


export const getUserNotifications =async ()=>{
    return axiosInstance.get('/users/profiles/notifications');
}

export const getOtp =async(data)=>{
    console.log("In api",data);
    return axiosInstance.put('/users/profiles/otp/verification',data,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("userToken")}`
        }
    });
}


export const buyProducts =async (orderData) => {
    console.log("order data", orderData);
    orderData.addressDetails.country= "India";
    // orderData.amount= 200;
    return await axiosInstance.post('/users/orders/buy', orderData);
    
}

export const proceedPaymentApi =async (orderId, amt) => {
    return axiosInstance.post('/payments/proceed/to/pay', {
        orderID: orderId,
        amt: amt*100
    });
}
