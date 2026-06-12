import { Router } from "express";
import * as addressController from "../controller/address.controller.js";

const router = Router();

router.post('/', addressController.createAddressController);

router.get('/user/:id', addressController.getAddressesController);

router.get('/:id', addressController.getAddressByIdController);

router.patch('/:id', addressController.updateAddressController);

router.delete('/:id', addressController.deleteAddressController);

export { router };
