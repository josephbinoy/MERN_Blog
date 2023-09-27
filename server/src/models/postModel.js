import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
	title:String,
    author:String,
    date:String,
	content:String  
	})

const Post=mongoose.model('post', postSchema);

export default Post;