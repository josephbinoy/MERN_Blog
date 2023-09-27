import axios from "axios";

const getPosts=(token)=>{
    return axios.get(`${import.meta.env.VITE_API_URI}/posts`,{ 
    headers: {"Authorization" : `Bearer ${token}`}
    })
}
export default getPosts;