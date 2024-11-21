import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (req, res, next) => {
    //Look/pull token from the header
    const token = req.header('x-auth-token');

    //If token is not found
    if(!token){
        return res.status(401).json({ errors: [{msg: 'No Token, Auth Denied'}]});
    }

    try{
        //Does jwtsecret match the jwtsecret in the token?
        const decoded = jwt.verify(token, process.env.jwtSecret);
        
        req.user = decoded.user; //If successful, set value of decoded.user

        next();

        //If verify fails, catch will run
    } catch(err) {
        console.error(err);
        res.status(401).json({ errors: [{msg: 'Token is not valid'}]});
    }
}