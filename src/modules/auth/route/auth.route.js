import { Router } from 'express'
import { loginUserController, registerUserController } from '../controller/auth.controller.js';
import { validateUserByField, validateUserThroughZod } from '../middleware/auth.middleware.js';
import { loginSchema, registerSchema } from '../schema/auth.schema.js';
import { loggerMiddleware } from '../middleware/logger.middleware.js';

const router = Router(); 

router.use(loggerMiddleware); 

router.post('/register', validateUserThroughZod(registerSchema), registerUserController); 

router.post('/login' , validateUserThroughZod(loginSchema), loginUserController); 

export { router };  

// const bodyTemplate = {
//   body : {
//     name: {
//       required: true, 
//       minChar: 2, 
//       maxChar: 8, 
//       type: "string"
//     }, 
//     email: {
//       required: true, 
//       type: "string", 
//     },
//     password : {
//       required: true, 
//       type: "number", 
//     }
//   }
// }; 