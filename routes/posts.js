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


// Store a new post
router.post('/', (req, res) => {
    const { title, content } = req.body;

    if(!title || !content){
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = {
        id: posts.length + 1,
        title: title,
        content: content
    };

    posts.push(newPost);

    res.status(201).json({ post: newPost, message: 'Post created successfully' });

    
})

router.put('/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    let post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    post.title = title;
    post.content = content;

    res.status(200).json({ post, message: 'Post updated successfully' });
});

router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const deletedPost = posts[postIndex];
    posts.splice(postIndex, 1);

    res.status(200).json({ post: deletedPost, message: 'Post deleted successfully' });
});



export default router;