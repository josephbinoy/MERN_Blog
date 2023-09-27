import axios from "axios";

const loginRequest=(user)=>{
    return axios.post(`${import.meta.env.VITE_API_URI}/login`, user)
}
export default loginRequest;