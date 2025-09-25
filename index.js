const Express = require("express");
const bodyParser = require("body-parser");
const mainRoute = require("./routes.js");
const { createServer } = require( "http");
const { Server } = require("socket.io");
const cors = require("cors");

var mongoose = require("mongoose");

require("dotenv").config();
const config = require("./common/Config.js");

const app = new Express();
const httpServer = createServer(app);
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURL, {})
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Additional CORS Handling
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  console.log("method: ", req.method, " url: ", req.url);
  next();
});


const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("send_message", (msg) => {
    console.log("📩 Message received:", msg);
    io.emit("receive_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});


app.set("io", io);



app.use("/api/wa", mainRoute);



// Start server
httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
