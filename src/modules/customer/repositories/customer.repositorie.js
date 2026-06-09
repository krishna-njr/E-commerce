import { prisma } from "../../../../clients/pg-client.js";


export const getAllProduct = async () => {
    try{
      const products = await prisma.product.findMany(); 
      return products; 
  }catch(err){
    console.log(err.message);
    throw new Error('something went wrong !', err.message); 
  }
}

export const filterProduct = async (filter) => {
  try{
    // **************************************
    const filterProduct = await prisma.product.findMany({
      where: {
          filter
      }
    }); 
    return filterProduct; 
  }catch(err){
    console.log(err.message);
    throw new Error('something went wrong !', err.message); 

  }
}

export const getPaginated = async () => {
  try{
    const tenProducts = await prisma.product.findMany({
      take: 10, 
    }); 
    return tenProducts; 
  }catch(err){
    console.log(err.message); 
    throw new Error('something went wrong !', err.message); 
  }
}


export const searchProduct = async (search_name) => {
  try{
    const searchProduct = await prisma.product.findMany({
      where:{
        name: search_name
      }
    }); 
    return searchProduct; 
  }catch(err){
    console.log(err.message); 
    throw new Error('something went wrong !', err.message); 
  }
}



export const sortProductInDesc = async (type) => {
  try{
    const sortedProduct = await prisma.product.findMany({
      where: {
        type: type
      }, 
      orderby: 'desc', 
    }); 
    return sortedProduct; 
  }catch(err){
    console.log(err.message); 
    throw new Error('something went wrong !', err.message); 
  }
}

export const sortProductInAsc = async (type) => {
  try{
    const sortedProduct = await prisma.product.findMany({
      where: {
        type: type
      }, 
      orderby : 'asc',
    }); 
    return sortedProduct; 
  }catch(err){
    console.log(err.message); 
    throw new Error('something went wrong !', err.message); 
  }
}


// ***********************************************
// order : 
export const makeOrder = async ({address, details}) => {
  try{
    const isProductAvailablity = await prisma.product.updateOne({
      where: {
        AND: [
          { name: details.name },
          { quantity: quantity > details.quantity } 
        ]
      }, 
      data: {
        quantity: {
          decrement: 1
        }, 
      },
    });

    if(!isProductAvailablity){
      throw new Error('Product is not available', isProductAvailablity); 
    }


    const order = await prisma.order.updateOne({
      where: {
        address: address
      },
      data: {
        payment_status: true, 
        shipping_status: true, 
        quantity: details.quantity, 
      }
    }); 

    return order; 
  }catch(err){
    console.log(`Failed to placed order :`, err.message); 
    throw new Error('something went wrong, while placing the order :', err.message); 
  }
}