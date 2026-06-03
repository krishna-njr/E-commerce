import userDB from "../../shared/userDB.js"; 

export const isPassword = ({email, password}) => {

    return userDB.find((user) => (user.email === email && user.password === password))? true : false; 
}


export const getUser = (email) => {

    return userDB.find((user) => (user.email === email)); 
}