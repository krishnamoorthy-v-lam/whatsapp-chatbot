require("dotenv").config();
module.exports = {
  mongoURL: process.env.mongoURL,
  PERSON_TO_PERSON: process.env.PERSON_TO_PERSON,
};
