const messageModel = require("../model/message");
const { message: messageTrigger } = require("../utils/MessageTemplate/Message");
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
      text:
        message.text?.body ||
        message?.interactive?.[message?.interactive?.type]?.title,
      direction: "incoming",
      timestamp: new Date(message.timestamp * 1000),
    };
    // console.dir(payload, { depth: null });
    const res = await messageModel.create(payload);
    // console.log("res: ", res);
    console.dir(message, { depth: null });

    if (res.type == "interactive" && payload.direction === "incoming") {
      let data = messageTrigger(
        message?.interactive?.[message?.interactive?.type]?.id
      )({
        to: contact?.wa_id,
      });

      let response = await sendMessage(data);
    } else if (res.type == "text" && payload.direction === "incoming") {
      console.log("check")
      let data = messageTrigger()({
        to: contact?.wa_id,
      });
      console.log(data)
      let response = await sendMessage(data);
    }

    return callback(null, {
      error: false,
      message: "Message Saved Successfully",
    });
  } catch (error) {
    console.log("error", error?.response?.data || error.message);
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
