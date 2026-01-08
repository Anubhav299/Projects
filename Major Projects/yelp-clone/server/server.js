import express from "express";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaurantRoutes.js";
const app = express();

dotenv.config();
const port = process.env.PORT || 3001;

// ---Middleware---
app.use(express.json());

// ---API Routes---
app.use("/api/v1/restaurants", restaurantRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
