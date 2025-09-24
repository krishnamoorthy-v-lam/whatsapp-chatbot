const messageModel = require("../model/message");
const messageTrigger = require("../utils/MessageTemplate/Message");
const { sendMessage } = require("../utils/WhatsappAPI/api");

module.exports.saveReceivedMessage = async (receivedData, callback) => {
  try {
    const value = receivedData.entry[0].changes[0].value;

    const message = value.messages?.[0];
    const contact = value.contacts?.[0];

    if (!message) {
      return callback({
        error: true,
        message: "something went wrong",
      });
    }

    let payload = {
      waId: contact.wa_id,
      profileName: contact.profile?.name,
      phoneNumberId: value.metadata.phone_number_id,
      displayPhoneNumber: value.metadata.display_phone_number,
      messageId: message.id,
      type: message.type,
      text: message.text?.body,
      direction: "incoming",
      timestamp: new Date(message.timestamp * 1000),
    };

    const res = await messageModel.create(payload);

    if (message.type == "interactive") {
      let data = messageTrigger(message.interactive.button_reply.id)({
        to: contact.wa_id,
      });

      let response = await sendMessage(data);
      console.log("message sended: ", response);
    }

    return callback(null, {
      error: false,
      message: "Message Saved Successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.saveSendMessage = async (receivedData, callback) => {
  try {
    const value = receivedData.entry[0].changes[0].value;

    const message = value.messages?.[0];
    const contact = value.contacts?.[0];

    if (!message) {
      return callback({
        error: true,
        message: "something went wrong",
      });
    }

    let payload = {
      waId: contact.wa_id,
      profileName: contact.profile?.name,
      phoneNumberId: value.metadata.phone_number_id,
      displayPhoneNumber: value.metadata.display_phone_number,
      messageId: message.id,
      type: message.type,
      text: message.text?.body,
      direction: "incoming",
      timestamp: new Date(message.timestamp * 1000),
    };

    const res = await messageModel.create(payload);

    return callback(null, {
      error: false,
      message: "Message Saved Successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};
