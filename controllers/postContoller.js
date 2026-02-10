const posts = [
    { id: 1,title: 'Post 1', content: 'This is the content of post 1' },
    { id: 2,title: 'Post 2', content: 'This is the content of post 2' },
    { id: 3,title: 'Post 3', content: 'This is the content of post 3' },
];

// @desc Get All posts
// @route Get api/posts
const getPosts =  (req, res, next) => {
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
};

// @desc Get single post
// @route Get api/post/:id
const getPost = (req, res, next) => {
    const postId = parseInt(req.params.id);

    if(isNaN(postId)){
        return res.status(400).json({ error: 'Invalid post ID' });
    }
    const post = posts.find(p => p.id === postId);

    if(!post){
        let msg = `Post with ID ${postId} not found.`;
        const error = new Error(msg);
        error.status = 404;
        return next(error);
    }

    res.status(200).json({ post: post, message: 'Post retrieved successfully' });
}

// @desc Store a post
// @route Post api/posts
const storePost = (req, res, next) => {
    const { title, content } = req.body;

    if(!title || !content){
        let msg = `Title and content are required`;
        const error = new Error(msg);
        error.status = 400;
        return next(error);
    }

    const newPost = {
        id: posts.length + 1,
        title: title,
        content: content
    };

    posts.push(newPost);

    res.status(201).json({ post: newPost, message: 'Post created successfully' });
}

// @desc Update post
// @route PUT api/post/:id
const updatePost = (req, res, next) => {
    const postId = parseInt(req.params.id);

    if (isNaN(postId)) {
        let msg = `Invalid post ID`;
        const error = new Error(msg);
        error.status = 400;
        return next(error);
    }

    let post = posts.find(p => p.id === postId);

    if (!post) {
        let msg = `Post with ID ${postId} not found.`;
        const error = new Error(msg);
        error.status = 404;
        return next(error);
    }

    const { title, content } = req.body;

    if (!title || !content) {
        let msg = `Title and content are required`;
        const error = new Error(msg);
        error.status = 400;
        return next(error);
    }

    post.title = title;
    post.content = content;

    res.status(201).json({ post, message: 'Post updated successfully' });
}

// @desc Delete post
// @route Delete api/post/:id
const deletePost =  (req, res, next) => {
    const postId = parseInt(req.params.id);

    if (isNaN(postId)) {
        let msg = `Invalid post ID`;
        const error = new Error(msg);
        error.status = 400;
        return next(error);
    }

    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {

        let msg = `Post with ID ${postId} not found.`;
        const error = new Error(msg);
        error.status = 404;
        return next(error);
    }

    const deletedPost = posts[postIndex];
    posts.splice(postIndex, 1);

    res.status(200).json({ post: deletedPost, message: 'Post deleted successfully' });
}


export { getPosts, getPost, storePost, updatePost, deletePost };