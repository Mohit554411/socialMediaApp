import jwt from 'jsonwebtoken';     
import dotenv from 'dotenv';
dotenv.config();
const jwtMiddleware = (req, res, next) => {
    const token = req.cookies?.jwtToken;
    if (!token) {
        return res.redirect('/');
    }
    try {
        const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verifiedUser;
        next();
    } catch (error) {
        return res.redirect('/');
    }
}

export default jwtMiddleware;