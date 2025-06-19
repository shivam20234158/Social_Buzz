import express from 'express';
import cookieParser from 'cookie-parser'; // Middleware to parse cookies
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import path from "path";
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';// Importing the auth routes 
import chatRoutes from './routes/chat.route.js'; ;
import { connectDB } from './lib/db.js'; // Importing the database connection function
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT=process.env.PORT || 3006;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

//help to get all the routes by the changing the varibles authRoutes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});