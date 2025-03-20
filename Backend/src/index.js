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




// app.post('/api/auth/sign-in/email' , async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Data not found!" });
//         }

//         console.log(`Request sent from email: ${email} with password: ${password}`);

//         const response = await auth.api.signInEmail({
//             body: { email, password },
//             asResponse: true
//         });

//         console.log("Response", response);
//         res.status(200).json({ message: "SUCCESSFULLY SIGNED IN" });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(400).json({ message: "Invalid JSON" });
//     }
// });

// app.post("/api/auth/sign-up/email", async(req,res)=>{
//     const { email, password,name } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Data not found!" });
//         }

//         console.log(`Request sent from email: ${email} with password: ${password} : name ${name}`);

//         const response = await auth.api.signUpEmail({
//             body: { email, password,name },
//             asResponse: true
//         });

//         console.log("Response:", response);
//         res.status(200).json({ message: "SUCCESSFULLY SIGNED IN" });
// })
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
