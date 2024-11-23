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