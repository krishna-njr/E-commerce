

import { Router } from "express";
import { getAllProductController } from "../controller/customer.controller.js";

const router = Router();


router.get('/', getAllProductController); 



export { router }; 