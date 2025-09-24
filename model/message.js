const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    // Who is this conversation with (user/customer)

    waId: {
      // WhatsApp number (ex: 919750902797)
      type: String,
      required: true,
    },
    profileName: {
      // "Krishna" (optional from contacts.profile.name)
      type: String,
      trim: true,
    },

    // Business details

    phoneNumberId: {
      // your business phone_number_id
      type: String,
      required: true,
    },
    displayPhoneNumber: {
      type: String,
      trim: true,
    },

    // Message details

    messageId: {
      // WhatsApp's message id
      type: String,
      required: true,
    //   unique: true,
    },
    type: {
      type: String,
    //   enum: ["text", "image", "video", "document", "audio", "template"],
    //   required: true,
    },
    text: {
      // for type "text"
      type: String,
    },
    mediaUrl: {
      // for image, video, document, etc.
      type: String,
    },
    mediaMimeType: {
      type: String,
    },

    // Direction (incoming = user → business, outgoing = business → user)
    direction: {
      type: String,
      enum: ["incoming", "outgoing"],
      required: true,
    },

    // Delivery status (for outgoing messages)
    status: {
      type: String,
      enum: ["sent", "delivered", "read", "failed"],
      default: "sent",
    },

    // Meta info
    timestamp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model(
  "whatsapp_message",
  messageSchema,
  "whatsapp_message"
);
module.exports = messageModel;
