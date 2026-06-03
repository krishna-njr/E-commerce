import userDB from "../../shared/userDB.js";
import { isPassword } from "../services/login.services.js";

export const login = (req, res) => {
    const { email, password } = req.body; 

    if(!email || !password){
        return res.status(401).json({
            status: false, 
            message: 'email & password missing'
        })
    }
                   
    const passwordCheck = isPassword({email, password});   
    // console.log(userDB); 

    if(!passwordCheck){
        return res.status(401).json({
            status: false, 
            message: 'Invalid Credentials', 
        })
    }
    
    // const user = getUser(email); 
    // console.log({user: {password:_, ...restUserdata}}); 
    return res.status(200).json({
        status: true, 
        // user: user
    })
}