import jwt from "jsonwebtoken"

function verifyToken(req, res, next){
    const authHeader=req.headers.authorization;
    const key=process.env.jwt_pass;
    if(!authHeader)
        res.sendStatus(401);
    else{
        const token=authHeader.split(' ');
        jwt.verify(token[1], key, (err, decoded)=>{
            if(err)
                res.sendStatus(403);
            else{
                next();
            }
          });
    }
}

export default verifyToken;