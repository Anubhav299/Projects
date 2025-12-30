import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import sql from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { aj } from "./lib/arcjet.js";
import { error } from "console";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); //allows cross origin resource accessing
app.use(express.json()); //used to parse
app.use(helmet()); //security middleware that helps protect the app by setting various HTTP headers
app.use(morgan("dev")); //logs the requests

//applies arcjet rate limiting to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, //specifies that each request consumes one token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many Requests, Try again later." });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied." });
      } else {
        res.status(403).json({ error: "Forbidden." });
      }
      return;
    }

    //check for spoofed bots
    if ( decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoof bot detected." });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet Error", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database Initialised Successfully.");
  } catch (err) {
    console.log("Error initDB", err);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });
});
