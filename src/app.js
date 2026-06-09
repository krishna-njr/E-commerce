import express from 'express'; 
import { router as authRoutes } from './modules/auth/route/auth.route.js';
import userDB from './modules/shared/userDB.js';
import morgan from 'morgan';
import { router as customerProductRoutes } from './modules/customer/route/customer.route.js';
// import { router as registerRoute } from './modules/auth/register/register.routes.js';
const app = express(); 

app.use(express.json());

app.use(morgan('dev')); 

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/product', customerProductRoutes); 

app.get('/users', (req, res) => {

    // console.log(userDB); 
    res.send(userDB); 
}); 

app.use((err, req, res, next)=> {
    console.log(err.message); 
    next();     
})

export default app; 