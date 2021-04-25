const { PostsApi } = require("./lib");

const posts = new PostsApi({ basePath: "http://localhost:4010" });

posts.getPosts().then(res => console.log(res.data)).catch(console.error);
