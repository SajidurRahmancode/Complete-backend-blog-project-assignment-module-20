import mongoose from 'mongoose';

const TokenBlacklistSchema = new mongoose.Schema({
  token: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: process.env.JWT_SECRET_EXPIRES_IN
  }
});

const TokenBlacklistModel = mongoose.model('TokenBlacklist', TokenBlacklistSchema);
export default TokenBlacklistModel;