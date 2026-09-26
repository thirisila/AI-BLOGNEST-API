const express = require("express");
const blogRoutes = require("./src/routes/blogRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI BlogNest API is working!");
});

app.use("/api/blogs", blogRoutes);

module.exports = app;