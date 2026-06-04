import userDB from "../../shared/userDB.js";

export const createUser = ({name, email, password}) => {

	const newUser = {
		id: Date.now(), 
		name, 
		email, 
		password
	}; 
	 
	userDB.push(newUser); 
	return findFirstUser(email); 
}

export const findFirstUser = (email) => {
	return userDB.find((user) => (user.email === email)); 
}