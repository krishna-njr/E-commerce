import { createUser, isUser } from "../services/register.services.js";

export const register = (req, res) => {
    const { name, email, password } = req.body; 

    // console.log(req.body); 
    if(!name || !email || !password){
        return res.status(401).json({
            status: false, 
            message: 'Credentials missing'
        })
    }
    const userExist = isUser(email); 

    if(userExist){
        return res.status(401).json({
            status: false, 
            message: 'Invalid Credentials', 
        })
    }

    const user = createUser({name, email, password}); 

    return res.status(200).json({
        status: true
    })
}