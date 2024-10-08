const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const createError = require("http-errors");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config({ path: "./config.env" });
const routes = require("./routes/api");
const passport = require("passport");
const passportStrategy = require("./services/passport");
const { logger } = require("./services/logger");
const websocket = require("./services/websocket");
const {
  updateCompetitionStartsForToday,
  updateCompetitionEndsForToday,
} = require("./controllers/competition.controller");
// const https = require("https");
// const fs = require("fs");
const { setupAgenda } = require("./services/queueManager");
const { checkAdminAccount } = require("./services/admin");
const socketio = require("socket.io");

// MongoDB Connection Setup
const mongoURI = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/vidibattle";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((m) => {
    console.log("MongoDB Connected...");

    const app = express();
    const server = require("http").createServer(app);
    const io = socketio(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    // Middleware to attach io to req
    app.use((req, res, next) => {
      req.io = io;
      next();
    });

    // logging middleware
    app.use(logger);

    // middlewares
    app.set("trust proxy", 1);

    // Session Middleware Function
    const sessionMiddleware = (cookieName) =>
      session({
        name: cookieName,
        secret: process.env.SESSION_SECRET || "vidibattle",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: mongoURI, // Use the valid mongoURI here
          dbName: "vidibattle", // Explicitly specify the database name if required
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
          secure: process.env.NODE_ENV !== "development", // true in production
          sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        },
      });

    // Apply session and passport middlewares
    app.use("/api", sessionMiddleware("userSession"));
    app.use("/api", passport.initialize());
    app.use("/api", passport.session());

    app.use("/admin/api", sessionMiddleware("adminSession"));
    app.use("/admin/api", passport.initialize());
    app.use("/admin/api", passport.session());

    // Enable CORS for API and Admin URLs
    app.use(
      cors({
        origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
      })
    );

    // JSON parsing middleware
    app.use(express.json());

    // API Routes
    app.use("/api", routes);
    app.use("/admin/api", routes);

    // 404 Error Handler
    app.use(function (req, res, next) {
      next(createError(404, "Page Not Found"));
    });

    // Global Error Handler Middleware
    app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      console.error(
        err.statusCode,
        err.message,
        statusCode === 404 ? "" : err.stack
      );
      res.status(statusCode).json({ success: false, message: err.message });
    });

    // Cron Job Scheduling - Runs every hour
    cron.schedule("0 * * * *", async () => {
      await updateCompetitionStartsForToday();
      await updateCompetitionEndsForToday();
    });

    // Start the Server
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
      runOnServerStart(m);
    });

    // WebSocket Setup
    websocket(io);
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Functions to run on server start
const runOnServerStart = async (m) => {
  updateCompetitions();
  setupAgenda(m);
  checkAdminAccount();
};

// Competition Update Functions
const updateCompetitions = async () => {
  await updateCompetitionStartsForToday();
  await updateCompetitionEndsForToday();
};
