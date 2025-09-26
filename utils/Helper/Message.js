module.exports.sendMessage = ({ status, timestamp }) => {
  switch (status) {
    case "send":
    case "read":
    case "delivered":
    case "failed":
        return new Date(timestamp * 1000);
    default:
      return new Date(timestamp * 1000);
  }
};
