// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db";
import weatherRoutes from './routes/weatherRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
    cors({
        origin: process.env.URL_CORS,
        methods: "GET,POST,PUT,DELETE, PATCH",
        credentials: true,
    })
);

connectDB()

app.use('/weather', weatherRoutes);
app.use('/subscribe', subscriptionRoutes);
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
