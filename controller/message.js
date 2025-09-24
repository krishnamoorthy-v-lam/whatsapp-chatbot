const { success, failure } = require("../common/errorHandlers");
const messageService = require("../service/message");

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

module.exports.sendMessage = (req, res) => {
  const receivedData = req.body;
  messageService.sendMessage(receivedData, function (err, data) {
    if (err) {
      return failure(err, res);
    } else {
      return success(data, res);
    }
  });
};

module.exports.webhooks = (req, res) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
};

module.exports.receiveMessage = (req, res) => {
  let receivedData = req?.body;
  let query = req?.query;
  console.dir(receivedData, { depth: null });
  messageService.saveReceivedMessage(receivedData, function (err, data) {
    if (err) {
      return res.status(200);
    } else {
      return success(data, res);
    }
  });
};
