// utils/TokenHelper.js
import jwt from "jsonwebtoken";
import TokenBlacklistModel from '../models/TokenBlacklistModel.js';

export const EncodeToken = async (email, user_id) => {
    const KEY = process.env.JWT_SECRET;
    const EXPIRE = { expiresIn: process.env.JWT_SECRET_EXPIRES_IN || '1h' };
    const PAYLOAD = { email, user_id };
    return jwt.sign(PAYLOAD, KEY, EXPIRE);
}

export const DecodeToken = async (token) => {
    try {
        // Check if token is blacklisted in DB
        const isBlacklisted = await TokenBlacklistModel.findOne({ token });
        if (isBlacklisted) {
            return { status: "fail", data: "Token has been invalidated" };
        }

        const KEY = process.env.JWT_SECRET;
        return jwt.verify(token, KEY);
    } catch (error) {
        return { status: "fail", data: error.message };
    }
}

export const InvalidateToken = async (token) => {
    try {
        // Add token to MongoDB blacklist
        await TokenBlacklistModel.create({ token });
        return { status: "success", message: "Token invalidated successfully" };
    } catch (error) {
        return { status: "error", message: "Failed to invalidate token" };
    }
}