import { loginSchema } from "../schema/auth.schema.js";
import { compareUserPasswordWithEmailService, getUserDetailByEmailService, registerUserService, sanitize } from "../services/auth.service.js";

// register controller : 
export const registerUserController = (req, res) => {

    const { name, email, password } = req.body; 

    // const schemaCheck = sanitize(req.body); // since we are checking through middleware : 

    const alreadyExistuser = getUserDetailByEmailService(email); 

    const userExist = userExistDuringRegister(alreadyExistuser); 

    const user = registerUserService({name, email, password}); 

    return res.status(200).json({
        status: true, 
        user: user
    })
}

// login controller : 
export const loginUserController = (req, res) => {
    
    const { email, password } = req.body; 

    //schema check : 
    // const parsedUser = loginSchema.safeParse(req.body); 

    const passwordCheck = compareUserPasswordWithEmailService({email, password});   

    onPasswordInCorrect(passwordCheck); 
    
    const {password: _, sanitizeUser} = getUserDetailByEmailService(email); 

    return res.status(200).json({
        status: true, 
        user: sanitizeUser, 
    })
}
