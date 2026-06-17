import expressLimiter from "express-limiter";

const rateLimit = async (app, redisClient) => {
  
  const limiter = expressLimiter(app, redisClient); 
  
  limiter({
    path: /.*/, 
    method: 'all', 
    lookup: ["connection.remoteAddress"], 
  
    total: 100, 
    expire: 5 * 60 * 1000, 
  
    onRateLimit: ((req, res, next) => {
      next(new Error({message: "Rate Limit exceeded", status: 429})); 
    })
  })

  return limiter; 
}


export default rateLimit; 

