// in memory DB : BBBB
import z from "zod";
import { findFirstUser } from "../repositories/auth.repository.js";
import { registerSchema } from "../schema/auth.schema.js";

// Register New User : 
export const registerUserService = ({name, email, password}) => {

	const {password: _, ...sanitizedUser } = createUser({name, email, password}); 

	return sanitizedUser; 
}

// Get User via email 
export const getUserDetailByEmailService = (email) => {
	const user = findFirstUser(email); 
	return user; 
}

export const userExistDuringRegister = (user) => {
	if(user){
		throw new Error('Email already exist'); 
	}
}

export const compareUserPasswordWithEmailService = ({email, password}) => {
	const user = findFirstUser(email); 
	if(user){
		return user.password === password; 
	}
}

export const onPasswordInCorrect = (passwordCheck) => {
	if(!passwordCheck){
		throw new Error('Password is incorrect'); 
	}
}

// zod validation without middleware
export const sanitize = (body) => {

	const parsedUser = registerSchema.safeParse(body); 
	
	// console.log(parsedUser); 
	if(!parsedUser.success){
		const prettyError = z.prettifyError(parsedUser.error);
		// console.log(prettyError); 
		throw new Error(prettyError); 
	}

	return parsedUser;
}