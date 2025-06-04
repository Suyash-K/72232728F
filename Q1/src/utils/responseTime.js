const responseTime = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
    
    if (duration > 500) {
      console.warn(`⚠️  Response time exceeded 500ms: ${duration}ms`);
    }
  });
  
  next();
};

module.exports = responseTime;