import { Router } from "express";
import * as addressController from "../controller/address.controller.js";
import {
  validateAuthentication,
  authorize,
  validateRequest,
} from "../middleware/address.middleware.js";
import {
  createAddressSchema,
  deleteAddressSchema,
  getAddressByIdSchema,
  updateAddressSchema,
} from "../validations/address.validation.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("CUSTOMER", "SELLER"));

router.post(
  "/",
  validateRequest(createAddressSchema),
  addressController.createAddressController,
);

router.get("/", addressController.getAddressesController);

router.get(
  "/:id",
  validateRequest(getAddressByIdSchema),
  addressController.getAddressByIdController,
);

router.patch(
  "/:id",
  validateRequest(updateAddressSchema),
  addressController.updateAddressController,
);

router.delete(
  "/:id",
  validateRequest(deleteAddressSchema),
  addressController.deleteAddressController,
);

export { router };
