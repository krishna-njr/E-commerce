import AppError from "../../../../utils/AppError.js";
import successResponse from "../../../../utils/responseHelper.js";
import {
  createAddressService,
  deleteAddressService,
  getAddressByIdService,
  getAddressesService,
  updateAddressService,
} from "../service/address.service.js";

export const createAddressController = async (req, res) => {
  try {
    // schema validation :
    const addressDetails = { ...req.body, userId: req.user.id }; // fullName, street, city, state, postalCode, country, userId, phoneNumber
    const address = await createAddressService(addressDetails);

    successResponse(res, address, "Successfully created address");
  } catch (error) {
    throw new AppError(`Failed to create address`, 500);
  }
};
export const getAddressesController = async (req, res) => {
  try {
    const userId = req.user.id;
    // schema validation :
    const addresses = await getAddressesService(userId);

    successResponse(res, addresses, "Successfully get addresses");
  } catch (error) {
    throw new AppError(`Failed to get addresses`, 500);
  }
};
export const getAddressByIdController = async (req, res) => {
  try {
    const addressId = req.params.id;
    // console.log(userId);
    // schema validation :
    const address = await getAddressByIdService(addressId);

    successResponse(res, address, "Successfully get address");
  } catch (error) {
    throw new AppError(`Failed to get address`, 500);
  }
};
export const updateAddressController = async (req, res) => {
  try {
    const addressId = req.params.id;
    const addressDetails = req.body;
    // schema validation :
    const updatedAddress = await updateAddressService(
      addressId,
      addressDetails,
    );

    successResponse(res, updatedAddress, "Successfully updated address");
  } catch (error) {
    throw new AppError(`Failed to update address`, 500);
  }
};
export const deleteAddressController = async (req, res) => {
  try {
    const addressId = req.params.id;
    // schema validation :
    const deletedAddress = await deleteAddressService(addressId);

    successResponse(res, deletedAddress, "Successfully deleted address");
  } catch (error) {
    throw new AppError(`Failed to deleted address`, 500);
  }
};
// export const setDefaultAddressController = async (req, res) => {};
