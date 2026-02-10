import express from 'express';
import logger from "../middleware/logger.js";
const router = express.Router();
import { getPosts, getPost, storePost, updatePost, deletePost } from "../controllers/postContoller.js";





//  Get all posts
router.get('/', logger ,getPosts)

// Get a specific post
router.get('/:id', logger, getPost );


// Store a new post
router.post('/', logger, storePost)

router.put('/:id', logger, updatePost);

router.delete('/:id', logger, deletePost);



export default router;