const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

router.post("/create/:id", commentsCtrl.create);
router.put("/:id", commentsCtrl.update);
router.delete("/:id", commentsCtrl.delete);
router.get("/get-all", commentsCtrl.getAllComments);
router.get("/get-one/:id", commentsCtrl.getOneComment);

module.exports = router;
