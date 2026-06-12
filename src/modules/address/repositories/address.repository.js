import { prisma } from "../../../../clients/pg-client.js";
import AppError from "../../../../utils/AppError.js";
import { getAddressesService } from "../service/address.service.js";

export const createAddress = async ({ fullName, street, city, state, country, postalCode, phoneNumber, userId }) => {
  try {
    const address = await prisma.address.create({
      data: {
        fullName,
        city,
        country,
        postalCode,
        phoneNumber,
        state,
        street,

        userId,
      }
    });

    return address;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Server Side error : ${error.message}`, 500);
  }
};

export const getAddresses = async (userId) => {
  try {
    const addresses = await prisma.address.findMany({
      where: {
        userId: userId,
      },
      take: 5,
    })
    return addresses;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Server Side error : ${error.message}`, 500);
  }
};

export const getAddressById = async (id) => {
  try {
    const address = await prisma.address.findUnique({
      where: { id },
    })
    return address;

  } catch (error) {
    console.log(error.message);
    throw new AppError(`Server Side error : ${error.message}`, 500);
  }
};

export const updateAddress = async (addressDetails) => {
  try {
    const updatedAddress = await prisma.address.update({
      where: { id },
      data: {
        ...addressDetails,
      }
    })
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Server Side error : ${error.message}`, 500);
  }
};

export const deleteAddress = async (id) => {
  try {
    const deleteAddress = await prisma.address.delete({
      where: { id },
    });

    return deleteAddress;
  } catch (error) {
    console.log(error.message);
    throw new AppError(`Server Side error : ${error.message}`, 500);
  }
};

// export const setDefaultAddress = async () => {
//   try{

//   }catch(error){
//     console.log(error.message);
//     throw new AppError(`Server Side error : ${error.message}`, 500); 
//   }
// };