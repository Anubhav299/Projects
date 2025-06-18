import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/home", (req, res) => {
    res.render("index.ejs");
});

app.get("/blog", (req, res) => {
    res.render("blog.ejs");
});

const blogsArray = []

app.post("/createBlog", (req, res) => {
    const blogInfo = {
        Title : 
    }
})


app.listen(port, () => {
    console.log(`Running at ${port}.`);
})