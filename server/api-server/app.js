import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());

// import routes
import userRoutes from './routes/user.routes.js'
import { verifyJWT } from "./middlewares/authorize.middleware.js";
import authRoutes from './routes/auth.routes.js'
import storeRoutes from './routes/store.routes.js'

// use routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/store', storeRoutes)



// check the server - runtime
app.get('/ping', (req, res) => {
    res.json({
      message: 'OK',
      uptime: process.uptime(), // in seconds
      timestamp: new Date()
    });
});

// check server
app.get("/", (req, res) => {
  res.send("Rest API working : Hello World");
})  



export default app; 