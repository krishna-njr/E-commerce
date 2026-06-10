import { prisma } from "../../../../clients/pg-client.js";

export const findUserById = async (userId) =>{

  try{
    const user = prisma.user.findUnique({
      where : {userId}, 
    }); 

    return user; 
  }catch(err){
    throw new Error('Database error in findUserById ', err.message); 
  }
}; 


export const findUserByEmail = async (email) =>{
  try{
    const user = prisma.user.findUnique({
      where : {email}, 
    }); 

    return user; 
  }catch(err){
    throw new Error('Database error in findUserByEmail ', err.message);
  }
}; 

export const createUser = async (userData) => {
  try{
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: userData.email, 
          name: userData.name, 
          password: userData.password, // passing hash password from service. 
          phoneNumber: userData.phoneNumber, 
          role : userData.role, 
          status: 'active', // for now setting it default to 'active'
        }
      }); 

      await tx.cart.create({
        data: {
          userId : user.id,
        }
      }); 
    }); 2
  }catch(err){
    throw new Error('Database error in createUser', err.message); 
  }
}