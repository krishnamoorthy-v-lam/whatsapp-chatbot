const { firstMessage } = require("../utils/MessageTemplate/SendMessage");
const { sendMessage } = require("../utils/WhatsappAPI/api");
const MessageDao = require("../Dao/message");
const axios = require("axios");

module.exports.sendMessage = async (receivedData, callback) => {
  try {
    const data = firstMessage({
      to: receivedData?.phone,
    });
    let response = await sendMessage(data);
    
    return callback(null, {
      error: false,
      data: response?.data,
      message: "Data sended successfully",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return callback(error.response?.data || error.message);
  }
};

module.exports.saveReceivedMessage = (receivedData, callback) => {
  MessageDao.saveReceivedMessage(receivedData, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};
