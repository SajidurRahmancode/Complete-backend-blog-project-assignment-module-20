import { DecodeToken } from '../utils/TokenHelper.js ';
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "No token provided"
            });
        }
        const decoded = await DecodeToken(token);
        
        if (decoded.status === "fail") {
            return res.status(401).json({
                status: "fail",
                message: "Invalid or expired token"
            });
        }
        req.user = decoded;  
        next();
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Token verification failed"
        });
    }
};