const { Query } = require("./Query/query");
const { auth } = require("./Mutation/auth");

module.exports = {
  Query,
  Mutation: {
    ...auth
  }
};
