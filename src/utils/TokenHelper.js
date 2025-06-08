import jwt from "jsonwebtoken";



export const EncodeToken = async (email,user_id) => {
    const KEY=process.env.JWT_SECRET
    const EXPIRE={expiresIn:process.env.JWT_SECRET_EXPIRES_IN}
    const PAYLOAD={email,user_id};
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

export const DecodeToken = async (token) => {
    try {
       const KEY=process.env.JWT_SECRET
       return jwt.verify(token,KEY)
    } catch (error) {
        return { status: "fail", data: error.message };
    }
}