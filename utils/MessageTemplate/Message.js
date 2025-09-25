const {
  firstMessage,
  initalSuggestion,
  trackOrder,
  order1,
  order2,
  order3,
  talkSupport,
  conversationMessage,
} = require("./SendMessage");

module.exports.message = (type) => {
  console.log("type: ", type);
  switch (type) {
    case "init":
      return firstMessage;
    case "initalSuggestion":
      return initalSuggestion;
    case "track_order":
      return trackOrder;
    case "order1":
      return order1;
    case "order2":
      return order2;
    case "order3":
      return order3;
    case "talk_support":
      return talkSupport;
    case "conversationMessage":
      return conversationMessage;
    default:
      return initalSuggestion;
  }
};
