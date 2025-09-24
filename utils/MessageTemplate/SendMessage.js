module.exports.firstMessage = ({
  messaging_product = "whatsapp",
  to,
  type = "template",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    template: {
      name: "hello_world",
      language: {
        code: "en_US",
      },
    },
  };
};

// {
//     "messaging_product": "whatsapp",
//     "to": "919750902797",
//     "preview_url": false,
//     "recipient_type": "individual",
//     "type": "text",
//     // "template": {
//     //     "name": "hello_world",
//     //     "language": {
//     //         "code": "en_US"
//     //     }
//     // },

//      "text": { "body": "Hello Krishnamoorthy, what plan?" }
// }
