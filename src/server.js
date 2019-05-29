import dotenv from "dotenv";
dotenv.config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./middleware";
import { authenticateToken, isAuthenticated } from "./middleware";
import cors from 'cors';

const PORT = process.env.PORT || 5000;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

server.express.use(cors());
server.express.use(logger("dev"));
server.express.use(authenticateToken);

server.start({ port: PORT }, () =>
  console.log(`Server running on port ${PORT}`)
);
