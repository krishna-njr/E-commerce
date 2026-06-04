
export const loggerMiddleware = (req, res, next) => {
  console.log(`logger is ran!!!`); 
  console.log(`Ip ${req.ip} is requesting at ${Date.now()}`); 

  next(); 
}