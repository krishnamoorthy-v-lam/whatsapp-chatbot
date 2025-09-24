const express = require("express");

const apiRoutes = express.Router();

const messageController = require("./controller/message");

apiRoutes.post("/send-message", messageController.sendMessage);

module.exports = apiRoutes;
