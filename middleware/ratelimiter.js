import setRateLimit from 'express-rate-limit';




  
  const rateLimitMiddleware = (req, res, next) => {
  
   setRateLimit({
        windowMs: 1 * 60 * 1000, 
        max: 2,
        message: "Hold on mate, maybe get a life instead of spamming my api.",
        standardHeaders: true,
        legacyHeaders: true, 
        skipFailedRequests: true
      });
    
          next();
   
  
  }
  
  
  export default rateLimitMiddleware
  
  
  