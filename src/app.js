import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post 
document.querySelector('.post-submit').addEventListener('click', addPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edite state
document.querySelector('#posts').addEventListener('click', enabelEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', canceleEdit);

// GET Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err))
}

// Submit Posts
function addPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;
  
  const data = {
    title,
    body
  }

  // Validate input
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  } else {
    // Check for ID
    if (id === '') {
      // Create Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearField();
        getPosts();
      })
      .catch(err => console.log(err))
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err))
    }
  }
}

 // Delete Post
 function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you shure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

// Enable Edit State
function enabelEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    

    const data = {
      id,
      title,
      body
    }
    // Fill form with current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel Edit State
function canceleEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
