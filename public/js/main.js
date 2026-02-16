const output = document.querySelector('#show-post');
const getAllPostBtn = document.querySelector('#get-all-post');
const addPostBtn = document.querySelector('#add-post');


const getAllPosts = async () => {
    try {
        const response = await fetch('/api/posts');

        const data = await response.json();

        output.innerHTML = ''; 

        data.posts.forEach(post => { const li = document.createElement('li');
        li.textContent = `${post.id}: ${post.title}`; 
        output.appendChild(li);
    });
    }catch(error) {
        console.log(error);
    }
}

const addPost = async (e) => {
    e.preventDefault();
    try{
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const content = formData.get('content');
        const post = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title,content}),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(!post.ok){
            throw new Error(`Failed to add post`);
        }

        console.log('Adding post successfully!');
    }catch(error) {
        console.log(error);
    }
}


getAllPostBtn.addEventListener('click', getAllPosts);
addPostBtn.addEventListener('submit', addPost);