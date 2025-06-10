import UserModel from './../models/UserModel.js';
import bcrypt from 'bcrypt';

import { EncodeToken, DecodeToken, InvalidateToken } from '../utils/TokenHelper.js';

// Helper 
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim().toLowerCase());
};

const validatePassword = (password) => {
    // Minimum 8 characters, at least one letter, one number and one special character
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
};

export const UserRegService = async (email, password) => { 
    try {
        // Validate email 
        if (!validateEmail(email)) {
            return { status: "fail", message: "Invalid email format" };
        }

        // Validate password 
        if (!validatePassword(password)) {
            return { 
                status: "fail", 
                message: "Password must be at least 8 characters long and contain at least one letter, one number, and one special character" 
            };
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return { status: "fail", message: "Email already in use. Please use a different email or login." };
        }

        // Hash  password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await UserModel.create({
            email: email,
            password: hashedPassword
        });
        
        // Return user object without sensitive data
        const token = await EncodeToken(newUser.email, newUser._id);

        // Return user object with token
        const userResponse = {
            _id: newUser._id,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            token: token  // token
        };
        
        return { 
            status: "success", 
            message: "Account created successfully",
            data: userResponse 
        };
    } catch (e) {
        if (e.name === 'ValidationError') {
            return { status: "fail", message: `Validation error: ${e.message}` };
        } else if (e.name === 'MongoError') {
            return { status: "fail", message: "Database error occurred" };
        }
        return { 
            status: "error", 
            message: "An unexpected error occurred during registration",
            systemMessage: e.message 
        };
    }
}

export const UserLoginService = async (email, password) => { 
    try {
        // Validate email 
        if (!validateEmail(email)) {
            return { status: "fail", message: "Invalid email format" };
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            // Generic message for security (don't reveal if user exists)
            return { status: "fail", message: "Invalid credentials" };
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { status: "fail", message: "Invalid credentials" };
        }

        // Generate JWT 
        const token = await EncodeToken(user.email, user._id);

        // Create user response with token
        const userResponse = {
            _id: user._id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: token
        };
        
        return { 
            status: "success", 
            message: "Login successful",
            data: userResponse
        };
    } catch (e) {
        if (e.name === 'ValidationError') {
            return { status: "fail", message: `Validation error: ${e.message}` };
        } else if (e.name === 'MongoError') {
            return { status: "fail", message: "Database error occurred" };
        }
        return { 
            status: "error", 
            message: "An unexpected error occurred during login",
            systemMessage: e.message 
        };
    }
}



export const UserLogoutService = async (token) => { 
    try {
        if (!token) {
            return { status: "fail", message: "Token is required" };
        }

        // Verify token first
        const decoded = await DecodeToken(token);
        if (decoded.status === "fail") {
            return { status: "fail", message: "Invalid token" };
        }

        // Invalidate the token
        const invalidationResult = await InvalidateToken(token);
        if (invalidationResult.status !== "success") {
            return { status: "error", message: "Failed to logout" };
        }

        return { 
            status: "success", 
            message: "Logout successful"
        };
    } catch (e) {
        console.error("Logout error:", e);
        return { 
            status: "error", 
            message: "An unexpected error occurred during logout",
            systemMessage: e.message 
        };
    }
}