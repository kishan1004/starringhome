import { axiosInstance } from "../utils/axios";

export const userLogin = (userName, password) => {
    return axiosInstance.post('user/login', {
        userName,
        password
    })
}

// wire this API
export const userLogout = async() => {
    return axiosInstance.delete('user/logout').then(res => {
        if(res.status ===  200) {
            localStorage.removeItem("userToken");
        }
    })
}

//Orders Management
export const userProductsList = (data) => {
    let queryParams = "";
    const page = data.page ? `page=${data.page}` : null;
    if(data?.page !== null) {
        queryParams.push(`page=${data.page}`);
    }
    if(data?.page && data?.limit) {
        queryParams.push(`limit=${data.limit}`);
    }
    if(data?.sizes?.length>0) {
        const temp = data.sizes.split('').join('&sizes=')
        queryParams.push(`sizes=${temp}`);
    }
    if(data?.category?.length>0) {
        const temp = data.category.split('').join('&category=');
        queryParams.push(`category=${temp}`);
    }
    if(data?.price_gt){
        queryParams.push(`price_gt=${data.price_gt}`);
    }
    if(data?.price_lt) {
        queryParams.push(`price_lt=${data.price_lt}`);
    }
    if(data?.collections?.length>0) {
        const temp = data.collections.split('').join('&collections=');
        queryParams.push(`collections=${temp}`);
    }
    if(data?.tags?.length>0) {
        const temp = data.tags.split('').join('&tags=');
        queryParams.push(`tags=${temp}`);
    }
    if(data?.ratings?.length>0) {
        const temp = data.ratings.split('').join('&ratings=');
        queryParams.push(`ratings=${temp}`);
    }
    
    const allParams = queryParams.length >0 ?  queryParams.split('').join('&') : null;

    return axiosInstance.get(`users/orders/products/${allParams && `?${allParams}`}`);
}

export const getProductById = (id) => {
    if(!id) {
        console.error("Id is missing");
        return;
    }
    return axiosInstance.get(`/users/orders/products/${id}/view`);
}

