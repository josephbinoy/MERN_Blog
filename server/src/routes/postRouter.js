import Post from "../models/postModel.js"

function getPosts(req, res){
    Post.find().then((postArray)=>{
		res.send(postArray);
	})
	.catch(function (err) {
        console.log(err);
    });
}

function insertPost(req, res){
    const newPost=new Post({
		title:req.body.title,
        author:req.body.author,
        date:req.body.date,
		content:req.body.content
	})
	newPost.save().then(()=>{
		res.send("successfully saved the post"+newPost);
	})
}

function deletePost(req, res){
    const deleteID=req.body.id;
    Post.deleteOne({_id:deleteID}).then((del)=>{
        res.send("Deleted Count is "+del.deletedCount);
    });
}
export {getPosts, insertPost, deletePost};