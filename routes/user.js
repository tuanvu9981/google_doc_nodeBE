const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const authRouter = express.Router();
require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

authRouter.post('/api/signup', async (req, res) => {
    try {
        const { name, email, profilePic } = req.body;

        // email existed ?
        let user = await User.findOne({ email: email });
        if (!user) {
            user = new User({
                name: name,
                email: email,
                profilePic: profilePic
            });
            user = await user.save();
        }
        const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: JWT_EXPIRATION });
        res.json({ user, token });
        // equal to res.json({user})
    } catch (e) {
        res.json({ message: e.message });
    }
});

authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ user, token: req.token });
});

module.exports = authRouter;