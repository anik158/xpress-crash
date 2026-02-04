const express = require('express');

const path = require('path');

const app = express(); 

const port = process.env.PORT || 5001;

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','index.html'));
// });


// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','about.html'));
// });

// static web server
// app.use(express.static(path.join(__dirname,'public')))

const posts = [
  { id: 1,title: 'Post 1', content: 'This is the content of post 1' },
  { id: 2,title: 'Post 2', content: 'This is the content of post 2' },
  { id: 3,title: 'Post 3', content: 'This is the content of post 3' },
];


//  Get all posts
app.get('/api/posts', (req, res) => {

    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){
        return res.json(posts.slice(0, limit));
    }else{
        return res.json(posts);
    }
})

// Get a specific post
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.filter(p => p.id === postId);

    res.json(post);
});

app.listen(5050, () => {
  console.log('Server is running on port 5050');
});