const express = require('express');

const path = require('path');

const app = express(); 

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','index.html'));
// });


// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','about.html'));
// });

// static web server
// app.use(express.static(path.join(__dirname,'public')))

const posts = [
  { title: 'Post 1', content: 'This is the content of post 1' },
  { title: 'Post 2', content: 'This is the content of post 2' },
  { title: 'Post 3', content: 'This is the content of post 3' },
];

app.get('/api/posts', (req, res) => {
    res.json(posts);
})

app.listen(5050, () => {
  console.log('Server is running on port 5050');
});