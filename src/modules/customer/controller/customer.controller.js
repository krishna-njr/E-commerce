/*
  product : 
    watch - ( read )

*/

import { prisma } from "../../../../clients/pg-client.js"
import { getAllProductService } from "../services/customer.service.js"

export const getAllProductController = async (req, res) =>{

  try{
    const users = await getAllProductService(); 
    // console.log('inside all products controller')
    return res.status(200).json({
      status: true, 
      users: users,  
    }); 
  }
  catch(err){
    // next(err); 
    console.log(err); 
  }
}