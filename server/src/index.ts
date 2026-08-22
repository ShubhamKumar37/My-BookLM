import express from "express";
import "dotenv/config";
import { config } from "./config.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { registerRoutes } from "./routes/indes.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";
const app = express();
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

const clientUrl = process.env.CLIENT_URL ?? "http://localhost:3000";

app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    }),
);

registerRoutes(app);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
}); 