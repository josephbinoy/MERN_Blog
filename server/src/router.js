import express from "express";
import loginRouteHandler from "./routes/loginRouter.js";
import verifyToken from "./middleware/authenticate.js";
import {getPosts, insertPost, deletePost} from "./routes/postRouter.js"
const router=express.Router();

router.post("/login", loginRouteHandler);

router.get("/posts", verifyToken, getPosts);

router.post("/posts", verifyToken, insertPost);

router.delete("/posts", verifyToken, deletePost);

export default router;