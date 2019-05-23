import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";

const SERVER_URL =
  process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
const server = new GraphQLServer({});

server.express.use(logger("dev"));

server.start(SERVER_URL, () =>
  console.log(`Server running on port ${SERVER_URL}`)
);
