import { Router } from "express";
import * as addressController from "../controller/address.controller.js";
import {
  validateAuthentication,
  authorize,
} from "../middleware/address.middleware.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize("CUSTOMER", "SELLER"));

router.post("/", addressController.createAddressController);

router.get("/", addressController.getAddressesController);

router.get("/:addressId", addressController.getAddressByIdController);

router.patch("/:addressId", addressController.updateAddressController);

router.delete("/:addressId", addressController.deleteAddressController);

export { router };
