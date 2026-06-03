import { Router } from 'express'; 
import { register } from '../controller/register.controllers.js';

const router = Router(); 

router.post('/register', register); 
               
export  { router }; 