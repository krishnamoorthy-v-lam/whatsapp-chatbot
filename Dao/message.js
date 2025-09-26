const messageModel = require("../model/message");
const { message: messageTrigger } = require("../utils/MessageTemplate/Message");
const { sendMessage } = require("../utils/WhatsappAPI/api");
const config = require("../common/Config.js");

module.exports.saveReceivedMessage = async (receivedData, io, callback) => {
  try {
    const value = receivedData.entry[0].changes[0].value;
    console.dir(receivedData, { depth: null });
    const message = value.messages?.[0];
    const contact = value.contacts?.[0];
    const status = value.statuses?.[0];

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
      status: message?.status,
      direction: "incoming",
      timestamp: new Date(message?.timestamp * 1000),
    };
    let res = {};
    if (status?.id) {
      res = await messageModel.findOneAndUpdate(
        { messageId: payload?.messageId },
        {
          ...payload,
        },
        {
          new: true,
        }
      );
    } else {
      res = await messageModel.create(payload);
    }

    // console.log(
    //   "condition: ",
    //   config.PERSON_TO_PERSON,
    //   payload?.displayPhoneNumber
    // );

    if (config.PERSON_TO_PERSON != payload?.displayPhoneNumber) {
      if (res.type == "interactive" && payload.direction === "incoming") {
        let data = messageTrigger(
          message?.interactive?.[message?.interactive?.type]?.id
        )({
          to: contact?.wa_id,
        });

        let response = await sendMessage(data);
        this.saveSendMessage(response, payload);
      } else if (res.type == "text" && payload.direction === "incoming") {
        let data = messageTrigger()({
          to: contact?.wa_id,
        });
        let response = await sendMessage(data);
        this.saveSendMessage(response, payload);
      }
    } else {
      io.emit("new-mesg", {
        waId: res?.waId,
        message: res?.text,
        displayPhoneNumber: res?.displayPhoneNumber,
        messageId: res?.messageId,
        direction: res?.direction,
      });
    }

    return callback(null, {
      error: false,
      message: "Message Saved Successfully",
    });
  } catch (error) {
    console.log("error", error?.response?.data || error.message);
  }
};

module.exports.saveHumanAgentReceivedMessage = async (
  receivedData,
  callback
) => {
  try {
    console.dir(receivedData, { depth: null });
    return callback({
      error: false,
      message: "success",
    });
  } catch (error) {
    callback(error);
  }
};

module.exports.saveSendMessage = async (receivedData, payloadData) => {
  try {
    const value = receivedData.data;
    if (!value) {
      return { error: true, message: "Invalid payload: missing value" };
    }

    const message = value.messages?.[0];
    const contact = value.contacts?.[0];

    if (!message) {
      return { error: true, message: "No messages or contacts found" };
    }

    const payload = {
      waId: contact.wa_id,
      profileName: contact.profile?.name,
      phoneNumberId: process.env.PHONE_NUMBER_ID,
      displayPhoneNumber: process.env.DISPLAY_PHONE_NUMBER,
      messageId: message.id,
      type: payloadData.type,
      text: payloadData.text?.body || null,
      interactive: payloadData?.interactive || null,
      client_ref: payloadData?.client_ref,
      direction: "outgoing",
      timestamp: new Date(message?.timestamp * 1000),
    };

    const res = await messageModel.create(payload);

    return {
      error: false,
      message: "Message(s) saved successfully",
    };
  } catch (error) {
    console.error("Error saving message:", error);
    return { error: true, message: error.message || "Unknown error" };
  }
};

module.exports.getMessage = async (query, callback) => {
  try {
    let { phone } = query;
    let matchQuery = {};
    if (phone) {
      matchQuery["waId"] = phone;
    }
    let pipline = [
      {
        $match: matchQuery,
      },
      {
        $project: {
          waId: 1,
          message: "$text",
          displayPhoneNumber: 1,
          messageId: 1,
          direction: 1,
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ];
    let res = await messageModel.aggregate(pipline);

    return callback(null, {
      error: false,
      data: res,
      message: "Data Retrived Successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    callback(error);
  }
};
