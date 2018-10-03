const { GraphQLServer } = require("graphql-yoga");
const db = require("./db");
const Mutations = require("./resolvers/Mutations");
const Query = require("./resolvers/Query");

// Create GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Query,
      Mutation: Mutations
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
