function showMessage() {
    alert("Welcome to AI BlogNest! 🚀");
}

async function createBlog() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;

    if (!title || !author || !content) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                author: author,
                content: content
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Blog published successfully! 🎉");

            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("content").value = "";
            loadBlogs();
        } else {
            alert(data.message);
        }

    } catch (error) {
        alert("Unable to connect to server");
        console.error(error);
    }
}
async function loadBlogs() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/blogs");
        const blogs = await response.json();

        const blogList = document.getElementById("blogList");

        blogList.innerHTML = "";
        if (blogs.length === 0) {
    blogList.innerHTML = "<p>No blogs available.</p>";
    return;
}

        blogs.forEach(blog => {
            blogList.innerHTML += `
                <div class="blog-card">
                    <h3>${blog.title}</h3>
                    <p><strong>Author:</strong> ${blog.author}</p>
                    <p>${blog.content}</p>
                    <button onclick="deleteBlog('${blog._id}')">
                        Delete
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading blogs:", error);
    }
}

loadBlogs();
async function deleteBlog(id) {
    try {
        const response = await fetch(
            `http://127.0.0.1:5000/api/blogs/${id}`,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {
            alert("Blog deleted successfully! 🗑️");
            loadBlogs();
        } else {
            alert("Unable to delete blog");
        }

    } catch (error) {
        console.error("Delete error:", error);
    }
}