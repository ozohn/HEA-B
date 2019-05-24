import dotenv from "dotenv";
dotenv.config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
const server = new GraphQLServer({ schema });

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
=======
const SERVER_URL =
  process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
const server = new GraphQLServer({ schema });
>>>>>>> 396d2d5a4dfd0bc3af68055eb1207be3c79ab037

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on port ${PORT}`)
);
