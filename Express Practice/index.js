import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan());

app.get("/", (req, res) => {
    res.send("Ayooooo");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});