import axios from "axios";

const insertPost=(post, token)=>{
    return axios.post(`${import.meta.env.VITE_API_URI}/posts`, post, { 
    headers: {"Authorization" : `Bearer ${token}`
    }}
    )
}
export default insertPost;
