import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import logger from './middleware/logger.js';
import postsRouter from './routes/posts.js';
import errorHandler from './middleware/errorMiddleware.js';
import notFoundMiddleware from './middleware/notFound.js';

const app = express();

const filePath = fileURLToPath(import.meta.url);
console.log(filePath);

const dirName = path.dirname(filePath);



const port = process.env.PORT || 5001;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//  Logger middleware
app.use(logger);

// static web server
app.use(express.static(path.join(dirName,'public')))

app.use("/api/posts",postsRouter);


app.use(errorHandler);


app.use(notFoundMiddleware);



app.listen(5050, () => {
  console.log('Server is running on port 5050');
});