const { success, failure } = require("../common/errorHandlers");
const messageService = require("../service/message");

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
