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

module.exports.initalSuggestion = ({
  messaging_product = "whatsapp",
  to,
  type = "interactive",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    interactive: {
      type: "button",
      body: { text: "What do you want to do?" },
      action: {
        buttons: [
          {
            type: "reply",
            reply: { id: "track_order", title: "Track Order" },
          },
          {
            type: "reply",
            reply: { id: "talk_support", title: "Talk to Support" },
          },
        ],
      },
    },
  };
};

module.exports.trackOrder = ({
  messaging_product = "whatsapp",
  to,
  type = "interactive",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    interactive: {
      type: "list",
      body: { text: "Please choose one option:" },
      action: {
        button: "View Options",
        sections: [
          {
            title: "Available Options",
            rows: [
              { id: "order1", title: "Order 1" },
              { id: "order2", title: "Order 2" },
              { id: "order3", title: "Order 3" },
            ],
          },
        ],
      },
    },
  };
};

module.exports.order1 = ({
  messaging_product = "whatsapp",
  to,
  type = "text",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    text: { body: "Thank you for selecting track order 1" },
  };
};

module.exports.order2 = ({
  messaging_product = "whatsapp",
  to,
  type = "text",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    text: { body: "Thank you for selecting track order 2" },
  };
};

module.exports.order3 = ({
  messaging_product = "whatsapp",
  to,
  type = "text",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    text: { body: "Thank you for selecting track order 3" },
  };
};

module.exports.talkSupport = ({
  messaging_product = "whatsapp",
  to,
  type = "text",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    text: { body: "Soon our team Memember conduct you ticket id: xxx-xxx" },
  };
};

module.exports.conversationMessage = ({
  messaging_product = "whatsapp",
  to,
  type = "text",
  body = "message...",
}) => {
  // Validate required parameters
  if (!to) {
    throw new Error("Recipient phone number 'to' is required.");
  }

  return {
    messaging_product,
    to,
    type,
    text: { body },
    client_ref: Number(new Date())
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

//reply messae:

//  {
//    object: 'whatsapp_business_account',
//    entry: [
//      {
//        id: '1697824334234475',
//        changes: [
//          {
//            value: {
//              messaging_product: 'whatsapp',
//              metadata: {
//                display_phone_number: '15551784495',
//                phone_number_id: '736292589576692'
//              },
//              contacts: [ { profile: { name: 'Krishna' }, wa_id: '919750902797' } ],
//              messages: [
//                {
//                  from: '919750902797',
//                  id: 'wamid.HBgMOTE5NzUwOTAyNzk3FQIAEhggQUM1MzdBODNCQTY4QzMxQ0Q5NEIzQTQ1RENBOEYxQTkA',
//                  timestamp: '1758694857',
//                  text: { body: 'Omg' },
//                  type: 'text'
//                }
//              ]
//            },
//            field: 'messages'
//          }
//        ]
//      }
//    ]
//  }
