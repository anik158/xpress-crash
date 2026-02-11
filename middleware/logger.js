import colors from 'colors';

const logger = (req, res, next) => {

    // const colorMethod = {
    //     GET: "blue",
    //     POST: "green",
    //     PUT: "yellow",
    //     DELETE: "red",
    // }
    let color = colorMethod[req.method] || "white";
    console.log(colors[color](`${req.method} ${req.protocol}://${req.headers.host}${req.originalUrl}`));    next();
}


export default logger;