import { useContext, useState, useEffect } from 'react';
import TokenContext from '../user/TokenContext.js';
import { useMutation, useQueryClient} from "@tanstack/react-query";
import insertPost from "../API/insertPost.js"
import EditNoteIcon from '@mui/icons-material/EditNote';

function CreatePost(props){
    const [token]=useContext(TokenContext);
    const [isCreating, setIsCreating]=useState(false);
    const queryClient=useQueryClient();
    const mutation = useMutation({
        mutationFn: (toInsertBLog)=>{return insertPost(toInsertBLog, token).catch(err=>{console.log(err)})},
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['blogPosts'] })
        }
      })

    const [blog, setBlog]=useState({
        title:"",
        author:"",
        content:"",
        date:""
    })

    function completePost(e){
        e.preventDefault();
        const currentDate = new Date().toLocaleString();
        setBlog(prevValue => ({ ...prevValue, date: currentDate }));
    }

    function handleChange(e){
        const newStuff=e.target.value;
        const caller=e.target.name;
        setBlog(prevValue=>({...prevValue, [caller]:newStuff}));  
    }

    useEffect(()=>{
        if(blog.date!==""){
            mutation.mutate(blog);
            setBlog({
                title:"",
                author:"",
                content:"",
                date:""
            })
            setIsCreating(false);
        }
    },[blog])

    return(
        <>
            {isCreating&&<h1>Create a new Blog Post!</h1>}
            <form className="postForm" onSubmit={completePost}>
                {isCreating&&<input onChange={handleChange} type="text" name="title" placeholder="Title" value={blog.title}></input>}
                {isCreating&&<input onChange={handleChange} type="text" name="author" placeholder="Author" value={blog.author}></input>}
                <div className='hero_edit'>
                <textarea onClick={()=>{setIsCreating(true)}} onChange={handleChange} name="content" placeholder={isCreating?"Content":"Create a new post"} value={blog.content} rows={isCreating?"6":"1"}></textarea>
                {!isCreating&&<span><EditNoteIcon fontSize='large'/></span>}
                </div>
                {isCreating&&<button className="primary_btn" type="submit">Add Post</button>}
            </form>
        </>
    )
}

export default CreatePost;