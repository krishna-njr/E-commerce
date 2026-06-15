import AppError from "../../../../utils/AppError.js";
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  updateAddress,
} from "../repositories/address.repository.js";

export const createAddressService = async (addressDetails) => {
  try {
    const address = await createAddress(addressDetails);

    if (!address) {
      throw new AppError(`Address not found`, 404);
    }
    return address;
  } catch (error) {
    throw new AppError(`Address Not Created, ${error.message}`);
  }
};

export const getAddressesService = async (userId) => {
  try {
    if (!userId) {
      throw new AppError(`Missing Id`, 409);
    }
    const addresses = await getAddresses(userId); // only 5 addresses :

    if (addresses.length < 1) {
      throw new AppError(`Addresses Not Found`, 404);
    }

    return addresses;
  } catch (error) {
    throw new AppError(`Failed to get addresses`, 500);
  }
};

export const getAddressByIdService = async (addressId) => {
  try {
    if (!addressId) {
      throw new AppError("Missing addressId", 409);
    }
    const address = await getAddressById(addressId);

    if (!address) {
      throw new AppError(`Address Not Found`, 404);
    }
    return address;
  } catch (error) {
    throw new AppError("Failed to get address", 500);
  }
};

export const updateAddressService = async (addressId, addressDetails) => {
  try {
    if (!addressId) {
      throw new AppError("Missing addressId", 409);
    }
    console.log("insdie address serivce", addressId, addressDetails);

    const address = await updateAddress(addressId, addressDetails);

    if (!address) {
      throw new AppError(`Address Not Found`, 404);
    }
    return address;
  } catch (error) {
    throw new AppError("Failed to update address", 500);
  }
};

export const deleteAddressService = async (addressId) => {
  try {
    if (!addressId) {
      throw new AppError("Missing addressId", 409);
    }
    const address = await deleteAddress(addressId);

    if (!address) {
      throw new AppError(`Address Not Found`, 404);
    }
    return address;
  } catch (error) {
    throw new AppError("Failed to delete address", 500);
  }
};

// export const setDefaultAddressService = async () => {
//   try{
//     if(!addressId){
//       throw new AppError('Missing addressId', 409);
//     }
//     const address = await getAddressById(addressId);

//     if(!address){
//       throw new AppError(`Address Not Found`, 404)
//     }
//   }
//   catch(error){
//    throw new AppError('Failed to get address', 500);
//   }
// };
