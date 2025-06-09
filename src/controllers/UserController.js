import { UserRegService } from "../services/UserService.js";
import { UserLoginService } from "../services/UserService.js";



export const register = async (req, res) => {
    try {
        // Get email and password from request BODY (not params)
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required"
            });
        }

        const result = await UserRegService(email, password);
        
        // Return appropriate status code based on result
        const statusCode = result.status === "success" ? 201 : 400;
        return res.status(statusCode).json(result);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}


export const login = async (req, res) => {
    try {
        // Get email and password from request BODY (not params)
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required"
            });
        }

        const result = await UserLoginService(email, password);
        
        // Return appropriate status code based on result
        const statusCode = result.status === "success" ? 201 : 400;
        return res.status(statusCode).json(result);
    } catch (error) {
        console.error("login error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}



export const createblog = async (req, res) => {
    try {
        // Get email and password from request BODY (not params)
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required"
            });
        }

        const result = await UserRegService(email, password);
        
        // Return appropriate status code based on result
        const statusCode = result.status === "success" ? 201 : 400;
        return res.status(statusCode).json(result);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}


