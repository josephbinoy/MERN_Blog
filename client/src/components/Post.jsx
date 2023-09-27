import { useMutation, useQueryClient} from "@tanstack/react-query";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import deletePost from "../API/deletePost.js"
import { useContext } from "react";
import TokenContext from '../user/TokenContext.js';

function Post({post}){
    const queryClient=useQueryClient();
    const [token]=useContext(TokenContext);
    const mutation = useMutation({
        mutationFn: (deleteID)=>{
            return deletePost(deleteID, token).catch(err=>{console.log(err)})
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['blogPosts'] })
        }
      })

    return(
        <>
            <div className="post">
                <div className='title'>
                    <h1>{post.title}</h1>
                    <IconButton onClick={()=>{mutation.mutate(post._id)}}>
                        <DeleteIcon fontSize="large" sx={{ color: red[500]}} />
                    </IconButton>
                </div>
                <p>By: {post.author}</p>
                <p>&emsp;&emsp;{post.content}</p>
                <p>{post.date}</p>
            </div>
        </>
    )
}

export default Post;