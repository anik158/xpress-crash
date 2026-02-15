const output = document.querySelector('#show-post');
const getAllPostBtn = document.querySelector('#get-all-post');


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


getAllPostBtn.addEventListener('click', getAllPosts);