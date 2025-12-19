import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const port = 5000;

//middlewares
app.use(cors());
app.use(express.json());

//Routes
//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await db.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM todo");
        const todos = result.rows;
        res.json(todos);
    } catch (err) {
        console.log(err.message);
    }
});


//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        const todos = result.rows[0];
        res.json(todos);
    } catch (err) {
        console.log(err.message);
    }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const desc = req.body.description;
        const todos = await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [desc, id]);
        res.json("Todo was updated !");
    } catch (err) {
        console.log(err.message);
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json(`Deleted ${id} from Database.`)
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(port, () => {
    console.log(`Listening at Port : ${port}`);
})