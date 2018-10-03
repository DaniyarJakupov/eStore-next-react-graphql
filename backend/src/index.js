require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
//const db = require("./db");

const server = createServer();

// TODO: use express middleware to handle JWT
// TODO: use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is running on http://localhost:${deets.port}`);
  }
);
