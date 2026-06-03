import express from 'express'; 
import { router as authRoute } from './modules/auth/route/index.route.js';
import userDB from './modules/shared/userDB.js';
// import { router as registerRoute } from './modules/auth/register/register.routes.js';
const app = express(); 

app.use(express.json());

app.use('/api/v1/auth', authRoute);

app.get('/users', (req, res) => {

    // console.log(userDB); 
    res.send(userDB); 
})

// app.use('/api/v1/auth/', registerRoute); 

export default app; 