const jwtUtils = require("../middleware/jwtUtils");
const models = require("../models");

module.exports = {
  create: async (req, res) => {
    const { content } = req.body;
    const authorization = req.headers["authorization"];
    const userId = jwtUtils.getUser(authorization);
    const postId = req.params.id;

    if (content == "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const newComment = await models.Comments.create({
      content: content,
      users_id: userId,
      posts_id: postId,
    });

    if (newComment) {
      return res
        .status(200)
        .json({ message: "Comments a été crée.", post: newComment });
    } else {
      return res.status(400).json({ message: "Erreur" });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;

    if (content === "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const comment = await models.Comments.findOne({
      attributes: ["id", "conten", "post_id", "users_id"],
      where: { id },
    });

    await comment
      .update({
        content: content ? content : comment.content,
      })
      .then((post) => {
        return res
          .status(200)
          .json({ message: "modification effectué", post: post });
      })
      .catch((e) => {
        return res
          .status(400)
          .json({ message: "erreur lors de la modification" });
      });
  },

  delete: async (req, res) => {
    const id = req.params.id;

    const comment = await models.Comments.findOne({
      attributes: ["id", "conten", "post_id", "users_id"],
      where: { id },
    });

    if (comment) {
      await models.Comments.destroy({
        where: { id: id },
      })
        .then(() => {
          return res.status(200).json({ message: "comment supprimé" });
        })
        .catch((e) => {
          return res
            .status(400)
            .json({ message: "erreur lors de la suppression" });
        });
    }
  },
  getAllComments: async (req, res) => {
    await models.Comments.findAll({
      attributes: ["id", "conten", "post_id", "users_id"],
    })
      .then((posts) => {
        return res.status(200).json({ posts: posts });
      })
      .catch((e) => {
        return res.status(400).json({ message: "une erreur est survenue." });
      });
  },
  getOneComment: async (req, res) => {
    const commentId = req.params.id;
    await models.Comments.findOne({
      where: { id: commentId },
      attributes: ["id", "conten", "post_id", "users_id"],
    })
      .then((comment) => {
        return res.status(200).json({ comment: comment });
      })
      .catch((e) => {
        return res.status(400).json({ message: "Post pas trouvé" });
      });
  },
};
