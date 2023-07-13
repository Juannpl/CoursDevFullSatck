const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/postsCtrl');
const { imageUpload } = require('../middleware/multerConfig');

router.post('/create', imageUpload.single('image'), postsCtrl.create);
router.put('/:id', imageUpload.single('image'), postsCtrl.update);
router.delete('/:id', postsCtrl.delete)
router.get('/get-all', postsCtrl.getAllPosts)
router.get('/get-one/:id', postsCtrl.getOnePost)

module.exports = router;