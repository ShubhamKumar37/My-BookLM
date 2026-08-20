import express from "express";
import "dotenv/config";
import { config } from "./config.js";

const app = express();

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
}); 