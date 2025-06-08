import UserModel from './../models/UserModel.js';
import bcrypt from 'bcrypt';

// Helper functions
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    // Minimum 8 characters, at least one letter, one number and one special character
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
};

export const UserRegService = async (email, password) => { 
    try {
        // Validate email format
        if (!validateEmail(email)) {
            return { status: "fail", message: "Invalid email format" };
        }

        // Validate password strength
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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await UserModel.create({
            email: email,
            password: hashedPassword
        });
        
        // Return user object without sensitive data
        const userResponse = {
            _id: newUser._id,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };
        
        return { 
            status: "success", 
            message: "Account created successfully",
            data: userResponse 
        };
    } catch (e) {
        // More detailed error handling
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