const express = require("express");

const apiRoutes = express.Router();

const messageController = require("./controller/message");

apiRoutes.post("/send-message", messageController.sendMessage);
apiRoutes.get("/get-message", messageController.getMessage);

apiRoutes.get("/webhooks", messageController.webhooks);
apiRoutes.post("/webhooks", messageController?.receiveMessage);

apiRoutes.get("/human-agent/hooks", messageController.humanAgentHooks)
module.exports = apiRoutes;
