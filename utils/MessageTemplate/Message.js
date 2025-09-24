const { firstMessage, initalSuggestion,trackOrder, order1 } = require("./SendMessage");

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
      return order1
    default:
      return ()=>{};
  }
};
