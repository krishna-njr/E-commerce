import { Router } from "express";
import * as addressController from "../controller/address.controller.js";
import {
  validateAuthentication,
  authorize,
} from "../middleware/address.middleware.js";

const router = Router();

router.use(validateAuthentication);

router.use(authorize(["CUSTOMER", "SELLER"]));

router.post("/", addressController.createAddressController);

router.get("/user/:id", addressController.getAddressesController);

router.get("/:id", addressController.getAddressByIdController);

router.patch("/:id", addressController.updateAddressController);

router.delete("/:id", addressController.deleteAddressController);

export { router };
