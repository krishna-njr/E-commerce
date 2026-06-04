import express from 'express'; 
import { router as authRoutes } from './modules/auth/route/auth.route.js';
import userDB from './modules/shared/userDB.js';
// import { router as registerRoute } from './modules/auth/register/register.routes.js';
const app = express(); 

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/users', (req, res) => {

    // console.log(userDB); 
    res.send(userDB); 
})

export default app; 