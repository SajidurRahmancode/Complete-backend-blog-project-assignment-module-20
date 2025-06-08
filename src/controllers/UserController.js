import { UserRegService } from "../services/UserService.js";




export const register =async (req,res) => {
    let email = req.params.email;
    let password = req.params.email;
    let result = await UserRegService(email,password);
    return res.status(200).json(result);
}
