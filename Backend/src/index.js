import express from "express";
import user from "./routers/userRouter.js"
import connectDB from "./database.js";
import product from "./routers/productRouter.js";
import org from "./routers/orgRouter.js";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", user);
app.use("/product", product);
app.use("/org", org);

connectDB();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is operated on ${port} `);
})