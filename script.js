let posts = [
  { title: "First Post", content: "Welcome to the blog!" },
  { title: "Second Post", content: "Hello! there." },
];

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");
  if (pageId === "home") renderPosts(posts);
}

// Render posts
function renderPosts(filteredPosts) {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";
  filteredPosts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
    postsContainer.appendChild(postDiv);
  });
}

// new post
function addPost() {
  const title = document.getElementById("titleInput").value;
  const content = document.getElementById("contentInput").value;
  if (title && content) {
    posts.unshift({ title, content });
    document.getElementById("titleInput").value = "";
    document.getElementById("contentInput").value = "";
    showPage("home");
  } else {
    alert("Please fill in both title and content.");
  }
}

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Filter posts
function filterPosts(query) {
  const lower = query.toLowerCase();
  const filtered = posts.filter(
    post =>
      post.title.toLowerCase().includes(lower) ||
      post.content.toLowerCase().includes(lower)
  );
  renderPosts(filtered);
}

// Debounced search
document.getElementById("search").addEventListener(
  "input",
  debounce((e) => filterPosts(e.target.value), 300)
);

// Initial display
renderPosts(posts);
