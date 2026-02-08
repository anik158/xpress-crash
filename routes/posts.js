import express from 'express';
const router = express.Router();

const posts = [
  { id: 1,title: 'Post 1', content: 'This is the content of post 1' },
  { id: 2,title: 'Post 2', content: 'This is the content of post 2' },
  { id: 3,title: 'Post 3', content: 'This is the content of post 3' },
];


//  Get all posts
router.get('/', (req, res) => {

    const limit = parseInt(req.query.limit);

    let limitMsg = '';

    if(!isNaN(limit) && limit > 0){
        if(limit > posts.length){
            limitMsg = `Returning all posts.`;
        }else{
            limitMsg = "Returning the first " + limit + " posts.";
        }
        return res.status(200).json({"posts": posts.slice(0, limit), "message": `${limitMsg}`});
    }else{
        return res.status(200).json({"posts": posts, "message": "Retrieved all posts"});
    }
})

// Get a specific post
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    if(isNaN(postId)){
        return res.status(400).json({ error: 'Invalid post ID' });
    }
    const post = posts.filter(p => p.id === postId);

    if(post.length === 0){
        return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post: post, message: 'Post retrieved successfully' });
});

export default router;