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