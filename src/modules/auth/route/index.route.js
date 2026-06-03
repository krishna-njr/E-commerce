import { router as registerRoute } from './register.routes.js'; 
import { router as loginRoute } from './login.routes.js'; 

// import { router}

import { Router } from 'express'

const router = Router(); 

router.use('/', registerRoute); 

router.use('/', loginRoute); 

export { router }; 

// export const authRoute = {
//     registerRoute,
//     loginRoute,
// }; 