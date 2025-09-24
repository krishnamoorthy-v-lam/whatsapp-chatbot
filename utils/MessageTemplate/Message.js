const { firstMessage, initalSuggestion,trackOrder } = require("./SendMessage");

module.exports.message = (type) => {
  console.log("type: ", type);
  switch (type) {
    case "init":
      return firstMessage;
    case "initalSuggestion":
      return initalSuggestion;
    case "track_order":
      return trackOrder;
    default:
      return ()=>{};
  }
};
