import express from 'express';
import cookieParser from 'cookie-parser'; // Middleware to parse cookies
import dotenv from 'dotenv'; 
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';// Importing the auth routes 
import chatRoutes from './routes/chat.route.js'; ;
import { connectDB } from './lib/db.js'; // Importing the database connection function
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT=process.env.PORT || 3006;

//help to get all the routes by the changing the varibles authRoutes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});