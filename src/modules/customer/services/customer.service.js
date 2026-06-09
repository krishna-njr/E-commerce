import { getAllProduct } from "../repositories/customer.repositorie.js"


export const getAllProductService  = async () => {
  try{
    const products = await getAllProduct(); 
    // console.log(`all product services is ran`);
    
    return products; 
  }catch(err){
    throw new Error('Something went wrong while fetching users');  
  }
}; 

