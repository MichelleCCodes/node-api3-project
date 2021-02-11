const express = require("express");
const helmet = require("helmet");
// const morgan = require('morgan');
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");
const server = express();
const mw = require("./middleware/middleware");

server.use(helmet());
server.use(express.json());
// server.use(morgan('dev'));
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

//cannot successfully import morgan
