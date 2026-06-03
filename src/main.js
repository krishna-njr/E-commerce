import express from 'express'; 
import { config } from 'dotenv'; 
import app from './app.js';

config(); 

const PORT = process.env.PORT || 3000; 

// app.get('/api/v1/auth/register', (req, res) => {
//   console.log(`user is registered`)
//   res.send('user register'); 
// })
// app.get('/api/v1/auth/login', () => {
//   console.log(`user is login`)
//   res.send('user login'); 
// })

app.listen(PORT, () => {
  console.log(`server is up and running on http://localhost:${PORT}`)
}); 

export default app;