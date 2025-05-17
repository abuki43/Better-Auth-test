import express from 'express';
import { configDotenv } from 'dotenv';
import prisma from './db/prisma.js';
import { auth } from './utils/auth.js';
import { toNodeHandler } from "better-auth/node";
import cors from 'cors';

configDotenv();

const app = express();
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true, // Allow cookies and authentication headers
    })
  );
const PORT = process.env.PORT || 3000;

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json()); 

app.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
