import express from 'express';
import path from 'path';
import logger from './middleware/logger.js';
import postsRouter from './routes/posts.js';
import errorHandler from './middleware/errorMiddleware.js';
import notFoundMiddleware from './middleware/notFound.js';

const app = express(); 

const port = process.env.PORT || 5001;

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','index.html'));
// });

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//  Logger middleware
app.use(logger);

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','about.html'));
// });

// static web server
// app.use(express.static(path.join(__dirname,'public')))

app.use("/api/posts",postsRouter);


app.use(errorHandler);


app.use(notFoundMiddleware);



app.listen(5050, () => {
  console.log('Server is running on port 5050');
});