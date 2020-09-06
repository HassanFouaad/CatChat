const moment = require("moment");
const formatMessage = (userName, text) => {
  return {
    userName,
    text,
    time: moment().format("h:mm a"),
  };
};

module.exports = formatMessage;
