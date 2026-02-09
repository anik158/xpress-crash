const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.headers.host}${req.originalUrl}`);
    next();
}


export default logger;