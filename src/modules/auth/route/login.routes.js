import { Router } from 'express'; 
import { login } from '../controller/login.controllers.js';

const router = Router(); 

router.post('/login', login); 
               
export  { router }; 