import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());                    //allows cross origin resource accessing
app.use(express.json());            //used to parse
app.use(helmet());                  //security middleware that helps protect the app by setting various HTTP headers
app.use(morgan("dev"));             //logs the requests


app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
