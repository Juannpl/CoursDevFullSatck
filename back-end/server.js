const express = require("express");
const server = express();
require("dotenv").config({ path: "./config/.env" });
const routesUsers = require("./routes/usersRoutes");
const routesPosts = require("./routes/postsRoutes");
const routesComments = require("./routes/commentsRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: crud } = require("express-crud-router");
const models = require("./models");
const path = require("path");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(
  cors({
    origin: "http://localhost:3001",
  })
);
server.use("/public", express.static(path.join(__dirname, "/public")));

// routes
server.use("/user", routesUsers);
server.use("/post", routesPosts);
server.use("/comment", routesComments);

server.use(
  crud("/admin/users", {
    getList: ({ filter, limit, offset, order }) =>
      models.Users.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => models.Users.findByPk(id),
    create: (body) => models.Users.create(body),
    update: (id, body, { req, res }) =>
      models.Users.update(body, { where: { id } }).then(() =>
        res.status(200).json({ id, ...body })
      ),
    destroy: (id) => models.Users.destroy({ where: { id } }),
  })
);

server.use(
  crud("/admin/posts", {
    getList: ({ filter, limit, offset, order }) =>
      models.Posts.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => models.Posts.findByPk(id),
    create: (body) => models.Posts.create(body),
    update: (id, body, { req, res }) =>
      models.Posts.update(body, { where: { id } }).then(() =>
        res.status(200).json({ id, ...body })
      ),
    destroy: (id) => models.Posts.destroy({ where: { id } }),
  })
);

server.use(
  crud("/admin/comments", {
    getList: ({ filter, limit, offset, order }) =>
      models.Comments.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => models.Comments.findByPk(id),
    create: (body) => models.Comments.create(body),
    update: (id, body, { req, res }) =>
      models.Comments.update(body, { where: { id } }).then(() =>
        res.status(200).json({ id, ...body })
      ),
    destroy: (id) => models.Comments.destroy({ where: { id } }),
  })
);

server.listen(process.env.PORT, () => {
  console.log(`écoute du port ${process.env.PORT}`);
});
