const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtUtils = require("../middleware/jwtUtils");
require('dotenv').config({ path: './config/.env' });
const saltRounds = 10;
const validator = require('validator');
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

module.exports = {
    register: async (req, res) => {
        console.log(req.body);
        const { nom, prenom, email, password } = req.body

        if (nom == "" || prenom == "" || email == "" || password == "") {
            return res.status(500).json({ message: "Veuillez remplir tous les champs." });
        }
        if (!regexPassword.test(password)) {
            return res.status(400).json({ message: "invalid password" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "invalid email" })
        }
        const user = await models.Users.findOne({ where: { email: email } })
        if (user === null) {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                const newUser = await models.Users.create({
                    nom: nom,
                    prenom: prenom,
                    password: hash,
                    email: email,
                    is_admin: 0
                })
                if (newUser) {
                    return res.status(200).json({ message: "User crée." })
                } else {
                    return res.status(400).json({ message: "erreur serveur." })
                }
            });
        } else {
            return res.status(500).json({ message: "cet email existe déjà, veuillez-vous connecter." });
        }
    },
    auth: async (req, res) => {
        const { email, password } = req.body;
        if (email == "" || password == "") {
            return res.status(500).json({ message: "Veuillez remplir tous les champs." });
        }
        const user = await models.Users.findOne({ where: { email: email } });
        if (user) {
            const password_valid = await bcrypt.compare(password, user.password);
            if (password_valid) {
                token = jwt.sign({ "id": user.id, "email": user.email, "prenom": user.prenom, "nom": user.nom, "is_admin": user.is_admin }, process.env.SECRET);
                return res.status(200).json({ token: token });
            } else {
                return res.status(400).json({ error: "Password Incorrect" });
            }
        } else {
            return res.status(404).json({ error: "User does not exist" });
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        const { nom, prenom, email } = req.body

        if (nom == "" || prenom == "" || email == "") {
            return res.status(500).json({ message: "Veuillez remplir tous les champs." });
        }

        const user = await models.Users.findOne({ where: { id } });
        await user.update({
            nom: nom ? nom : user.nom,
            prenom: prenom ? prenom : user.prenom,
            email: email ? email : user.email
        }).then(() => {
            return res.status(200).json({ message: "modification effectué" });
        }).catch((e) => {
            return res.status(400).json({ message: "erreur lors de la modification" });
        })
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;

        const user = await models.Users.findOne({ where: { id: id } });
        if (user) {
            await models.Users.destroy({
                where: { id: id }
            }).then(() => {
                return res.status(200).json({ message: "utilisateur supprimé" });
            }).catch((e) => {
                return res.status(400).json({ message: "erreur lors de la suppression" });
            })
        }
    },
    getAllUsers: async (req, res) => {
        await models.Users.findAll()
            .then((users) => {
                return res.status(200).json({ users: users })
            })
            .catch((e) => {
                return res.status(400).json({ message: "une erreur est survenue." })
            })
    },
    getUserProfile: async (req, res) => {
        const authorization = req.headers['authorization']
        const userId = jwtUtils.getUser(authorization); 

        if(userId == null || userId == -1) {
            return res.status(400).json({ message: "Utilisateur pas authorize" });
        }

        await models.Users.findOne({where: {id: userId}})
        .then((user) => {
            return res.status(200).json({ user: user });
        }).catch((e) => {
            return res.status(400).json({ message: "Utilisateur pas trouvé" });
        })
    }
};