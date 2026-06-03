import userDB from "../../shared/userDB.js"; 

export const isUser = (email) => {

    return userDB.find((user) => user.email === email) ? true : false; 
}

export const createUser = ({name, email, password}) => {

    // console.log(name, email, password); 
    const newUser = {
        id: Date.now(), 
        name, 
        email, 
        password
    }; 
    userDB.push(newUser); 

    return userDB.find((user) => user.email === email);  
}
