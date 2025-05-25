import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", { weather: null, error: false });
});

app.post("/", (req, res) => {
    const city = req.body["city"];
    if (!city.trim())
    {
        res.render("index.ejs", { weather : null, error : true });
    }
    else
    {
        const temp = Math.floor((Math.random() * 10) + 20);
        const message = `It is ${temp}° in ${city}`;
        res.render("index.ejs", {weather : message, error : false });
        
    }
})


app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

