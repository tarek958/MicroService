const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./src/schemas/user.schema');
const { typeDefs: postTypeDefs, resolvers: postResolvers } = require('./src/schemas/post.schema');

const app = express();

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs],
  resolvers: merge(userResolvers, postResolvers),
  cors: {
    origin: '*', // Allows all origins
    credentials: true, // Allows credentials to be sent
  },
});

async function startServer() {
  await server.start(); // Await the server to start
  server.applyMiddleware({ app }); // Now you can apply the middleware
}

startServer().then(() => {
  app.listen({ port: 4000 }, () => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}).catch((error) => {
  console.error("Error starting server:", error);
});
