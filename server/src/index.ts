import express from "express";
import "dotenv/config";
import { config } from "./config.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
}); 