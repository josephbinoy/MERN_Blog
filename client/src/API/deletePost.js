import axios from "axios";

const deletePost=(deleteID, token)=>{return axios.delete(`${import.meta.env.VITE_API_URI}/posts`, { 
    headers: {"Authorization" : `Bearer ${token}`
    },
    data: {id:deleteID}
    })
}
export default deletePost;