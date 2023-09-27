import jwt from "jsonwebtoken";

function loginRouteHandler(req, res){
    const key=process.env.jwt_pass;
    const username=req.body.username;
    const password=req.body.password;
    if((username==process.env.userID)&&(password==process.env.password)){
        jwt.sign({ userID:'admin' }, key, {algorithm: 'HS256'},(err, token)=>{
            res.send(token)
        });
    }
    else{
        res.sendStatus(401);
    }
}
export default loginRouteHandler;

