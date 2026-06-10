// import { jwt } from "jsonwebtoken";
const { jwt } = 'jsonwebtoken'; 

export const generateAccessToken = (user) => {
  const { id, role } = user; 

  return jwt.sign({ id, role }, process.env.ACCESS_SECRET, { expiresIn: '15m' }); 
}; 

//  TODO : Diff secrect
export const generateRefreshToken = (user) => {
  const { id, role } = user; 

  return jwt.sign({ id, role }, process.env.ACCESS_SECRET, { expiresIn: '7d' }); 
}