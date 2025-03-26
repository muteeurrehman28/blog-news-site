// Sample posts data array
const posts = [
    {
      id: 1,
      title: "Breaking News: Market Update",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel semper nisi. Integer nec ex nec sapien vestibulum cursus.",
      comments: [
        { author: "Alice", text: "Great update, thanks for sharing!" },
        { author: "Bob", text: "I wonder how this will affect local markets." }
      ]
    },
    {
      id: 2,
      title: "Tech Insights: New Smartphone Release",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
      comments: [
        { author: "Charlie", text: "Can't wait to try out the new features." }
      ]
    }
  ];
  
  // Function to create a post element using semantic HTML and Bootstrap classes
  function createPost(post) {
    // Create article element
    const article = document.createElement("article");
    article.className = "card";
  
    // Card header with post title
    const header = document.createElement("div");
    header.className = "card-header";
    header.innerText = post.title;
    article.appendChild(header);
  
    // Card body with post content
    const body = document.createElement("div");
    body.className = "card-body";
    const contentPara = document.createElement("p");
    contentPara.className = "card-text";
    contentPara.innerText = post.content;
    body.appendChild(contentPara);
  
    // Button to show/hide comments
    const commentBtn = document.createElement("button");
    commentBtn.className = "btn btn-sm btn-primary";
    commentBtn.innerText = "Show Comments";
    commentBtn.dataset.postId = post.id;
    commentBtn.addEventListener("click", toggleComments);
    body.appendChild(commentBtn);
  
    // Comment container (initially hidden)
    const commentContainer = document.createElement("div");
    commentContainer.className = "comments mt-3";
    commentContainer.style.display = "none";
    commentContainer.id = `comments-${post.id}`;
  
    // Existing comments list
    const commentsList = document.createElement("div");
    commentsList.className = "comments-list";
    post.comments.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.innerHTML = `<strong>${comment.author}</strong>: ${comment.text}`;
      commentsList.appendChild(commentDiv);
    });
    commentContainer.appendChild(commentsList);
  
    // Comment submission form
    const commentForm = document.createElement("form");
    commentForm.className = "comment-form mt-2";
    commentForm.dataset.postId = post.id;
    commentForm.innerHTML = `
      <div class="form-group">
        <label for="author-${post.id}">Name</label>
        <input type="text" class="form-control" id="author-${post.id}" required>
      </div>
      <div class="form-group">
        <label for="comment-${post.id}">Comment</label>
        <textarea class="form-control" id="comment-${post.id}" rows="2" required></textarea>
      </div>
      <button type="submit" class="btn btn-sm btn-success">Submit Comment</button>
    `;
    commentForm.addEventListener("submit", submitComment);
    commentContainer.appendChild(commentForm);
  
    body.appendChild(commentContainer);
    article.appendChild(body);
  
    return article;
  }
  
  // Toggle the display of the comment section for a post
  function toggleComments(event) {
    const postId = event.target.dataset.postId;
    const commentSection = document.getElementById(`comments-${postId}`);
    if (commentSection.style.display === "none") {
      commentSection.style.display = "block";
      event.target.innerText = "Hide Comments";
    } else {
      commentSection.style.display = "none";
      event.target.innerText = "Show Comments";
    }
  }
  
  // Handle comment form submission
  function submitComment(event) {
    event.preventDefault();
    const form = event.target;
    const postId = form.dataset.postId;
    const authorInput = document.getElementById(`author-${postId}`);
    const commentInput = document.getElementById(`comment-${postId}`);
    const author = authorInput.value.trim();
    const commentText = commentInput.value.trim();
    if (author === "" || commentText === "") return;
  
    // Add the new comment to the comments list
    const newCommentDiv = document.createElement("div");
    newCommentDiv.className = "comment";
    newCommentDiv.innerHTML = `<strong>${author}</strong>: ${commentText}`;
  
    // Append new comment to the comments list container
    const commentsList = form.parentElement.querySelector(".comments-list");
    commentsList.appendChild(newCommentDiv);
  
    // Reset form
    form.reset();
  }
  
  // Load all posts into the main content container
  function loadPosts() {
    const postsContainer = document.getElementById("posts-container");
    posts.forEach(post => {
      const postElement = createPost(post);
      postsContainer.appendChild(postElement);
    });
  }
  
  // Initialize the page content on DOM ready
  document.addEventListener("DOMContentLoaded", loadPosts);
  