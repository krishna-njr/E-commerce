

import { jwt } from "jsonwebtoken";
import { exactOptional } from "zod";


export const generateAccessToken = (user) => {
  const { name, email } = user; 

  return jwt.sign({ name, email }, process.env.ACCESS_SECRET, { expiresIn: '15m' }); 

}; 

export const generateRefreshToken = (user) => {
  const { name, email } = user; 

  return jwt.sign({ name, email }, process.env.ACCESS_SECRET, { expiresIn: '7d' }); 
}