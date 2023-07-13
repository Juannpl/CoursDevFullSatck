const jwtUtils = require('../middleware/jwtUtils');
const models = require('../models');

module.exports = {
    create: async (req, res) => {
        const {title, description} = req.body;
        const authorization = req.headers['authorization']
        const userId = jwtUtils.getUser(authorization);
        const image = req.file;

        if (title == "" || description == "") {
            return res.status(500).json({ message: "Veuillez remplir tous les champs." });
        }
    
        const newPost = await models.Posts.create({
            title: title,
            description: description,
            pictures: image ? image.filename : 'test.png',
            users_id: userId
        })

        if(newPost) {
            return res.status(200).json({message: 'Posts a été crée.', post: newPost});
        } else {
            return res.status(400).json({message: 'Erreur'});
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const { title, description } = req.body;
        const image = req.file;

        if (title === "" && description === "" && image === null) {
            return res.status(500).json({ message: "Veuillez remplir tous les champs." });
        }

        const post = await models.Posts.findOne({
            attributes: ['id', 'title', 'description', 'pictures', 'users_id'],
            where: { id }
        });

        await post.update({
            title: title ? title : post.title,
            description: description ? description : post.description,
            pictures: image ? image.filename : post.pictures
        }).then((post) => {
            return res.status(200).json({ message: "modification effectué", post: post });
        }).catch((e) => {
            return res.status(400).json({ message: "erreur lors de la modification" });
        })
    },

    delete: async (req, res) => {
        const id = req.params.id;
        
        const post = await models.Posts.findOne({
            attributes: ['id', 'title', 'description', 'pictures', 'users_id'],
            where: { id }
        });

        if (post) {
            await models.Posts.destroy({
                where: { id: id }
            }).then(() => {
                return res.status(200).json({ message: "post supprimé" });
            }).catch((e) => {
                return res.status(400).json({ message: "erreur lors de la suppression" });
            })
        }
    },
    getAllPosts: async (req, res) => {
        await models.Posts.findAll({ 
            attributes: ['id', 'title', 'description', 'pictures', 'users_id'],
        })
        .then((posts) => {
            return res.status(200).json({ posts: posts })
        })
        .catch((e) => {
            return res.status(400).json({ message: "une erreur est survenue." })
        })
    },
    getOnePost: async (req, res) => {
        const postId = req.params.id
        await models.Posts.findOne({
            where: {id: postId},
            attributes: ['id', 'title', 'description', 'pictures', 'users_id']
        })
        .then((post) => {
            return res.status(200).json({ post: post });
        }).catch((e) => {
            return res.status(400).json({ message: "Post pas trouvé" });
        })

    }
}