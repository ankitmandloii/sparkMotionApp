require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.SERVER_PORT || 8080;
const cors = require('cors');
const routes = require("./routes/index.js");
const { dbConnection } = require('./config/db');
const { createCronJobs } = require('./utils/cronJob.js');
const path = require('path');
//process.env.CORS_ORIGIN || '*',
// Setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, '../CFABP/build')));

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
}

// Routes
app.use("/api", routes);

createCronJobs();
// Test route
// app.use("/", (req, res) => res.send("✅ Yes, Now you can hit APIs"));

// app.use('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

app.use('/dashbaord', (req, res) => {
  res.sendFile(path.join(__dirname, '../CFABP/build', 'index.html'));
});

const startServer = async () => {
  try {
    await dbConnection();
    server.listen(PORT, () => {
      console.log(` ✅ Server is ready to listen on port ${PORT}`);
    });

  } catch (err) {
    console.error(`❌Someting Went Wrong in Start Server, Error is  ${err}`);
    process.exit(1);
  }
}

startServer();


