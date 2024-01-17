import axios from "axios";


const BASE_URL = import.meta.env.VITE_URL

const signupApi = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/` + "signup", data)
        return response.data
    } catch (error) {
        console.log("Error occured", error);
        throw new Error(error.response.data.error)
    }
}

const loginApi = async (data) => {
    try {
        const response = await axios.get(`${BASE_URL}/` + "login", data)
        return response.data
    } catch (error) {
        console.error("Error occured ", error);
    }
}

const loggedinApi = async (data) => {
    try {
        const response = await axios.get(`${BASE_URL}/` + "loggedin", data)
        return response.data
    } catch (error) {
        console.error("Error occured ", error);
    }
}
export { signupApi, loginApi ,loggedinApi}