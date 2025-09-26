const axios = require("axios");
module.exports.sendMessage = function (data) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

module.exports.messageReadedStatus = function ({
  messaging_product = "whatsapp",
  status = "read",
  message_id,
}) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      messaging_product,
      status,
      message_id,
    },
  };
  return axios(config);
};
