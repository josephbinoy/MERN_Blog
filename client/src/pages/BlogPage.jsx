import {useContext, useState} from "react"
import {useQuery} from '@tanstack/react-query'
import getPosts from "../API/getPosts.js"
import FadeLoader from "react-spinners/FadeLoader.js"
import Navbar from "../components/Navbar.jsx"
import CreatePost from '../components/CreatePost.jsx';
import Post from "../components/Post.jsx"
import TokenContext from '../user/TokenContext.js';


export default function BlogPage(){
  const [token]=useContext(TokenContext);
  const { isLoading, error, data:apiPosts } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: ()=>{return getPosts(token)}
  })
  
  return(
    <>
      <Navbar />
      <div className="main_wrapper">
          <CreatePost />
      {(error)?<div>Error while fetching data</div>:(isLoading)?<FadeLoader />:
      apiPosts.data.toReversed().map((p)=><Post post={p} key={p._id} />)}
      </div>
    </>
  )
}