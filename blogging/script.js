// DOM Elements
const createPostForm = document.getElementById("createPostForm");
const editPostForm = document.getElementById("editPostForm");
const postsList = document.getElementById("postsList");
const cancelEditButton = document.getElementById("cancelEdit");

// Event Listeners
createPostForm.addEventListener("submit", handleCreatePost);
editPostForm.addEventListener("submit", handleEditPost);
cancelEditButton.addEventListener("click", cancelEdit);

// Load posts when the page loads
document.addEventListener("DOMContentLoaded", loadPosts);

// Function to handle creating a new post
function handleCreatePost(event) {
  event.preventDefault();
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;

  if (title && content) {
    const post = {
      id: Date.now(),
      title,
      content,
    };
    savePost(post);
    createPostForm.reset();
    loadPosts();
  }
}

// Function to handle editing a post
function handleEditPost(event) {
  event.preventDefault();
  const title = document.getElementById("editPostTitle").value;
  const content = document.getElementById("editPostContent").value;
  const postId = editPostForm.dataset.postId;

  if (title && content && postId) {
    const post = {
      id: postId,
      title,
      content,
    };
    updatePost(post);
    editPostForm.classList.add("hidden");
    createPostForm.classList.remove("hidden");
    loadPosts();
  }
}

// Function to cancel editing
function cancelEdit() {
  editPostForm.classList.add("hidden");
  createPostForm.classList.remove("hidden");
}

// Function to save a post to localStorage
function savePost(post) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to update a post in localStorage
function updatePost(updatedPost) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const index = posts.findIndex((post) => post.id == updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}

// Function to load and display posts
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  postsList.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="post-actions">
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
            </div>
        `;
    postsList.appendChild(postElement);
  });
}

// Function to edit a post
function editPost(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find((post) => post.id == postId);

  if (post) {
    document.getElementById("editPostTitle").value = post.title;
    document.getElementById("editPostContent").value = post.content;
    editPostForm.dataset.postId = post.id;
    editPostForm.classList.remove("hidden");
    createPostForm.classList.add("hidden");
  }
}

// Function to delete a post
function deletePost(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = posts.filter((post) => post.id != postId);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  loadPosts();
}
