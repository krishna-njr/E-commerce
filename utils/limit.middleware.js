import { fixedWindowLimit } from "./fixedWindowLimit.js";


export const rateLimitMiddleware =  (options = {}) => {
  const { limit = 60 , window = 60, keyGenerator = (req) => req.ip , message = "Too many request" } = options; 

  return async (req, res, next) => {
    const key = `ratelimit:${keyGenerator(req)}`; 
    const result = await fixedWindowLimit(key, limit, window); 
    // console.log(result);

    res.set({
      "x-RateLimit-Limit": limit, 
      "x-RateLimit-Remaining": result.remaining, 
      "x-RateLimit-Reset": Date.now() + (result.resetAt * 1000), 
    })

    if(!result.allowed){
        return res.status(429).json({
          error : 'Too many request', 
          retryAfter: result.resetAt, 
        })
    }

    next(); 
  }
}