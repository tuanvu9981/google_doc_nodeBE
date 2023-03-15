const express = require('express');
const User = require('../models/user');

const authRouter = express.Router();

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
        res.json({ user }); 
    } catch (e) { }
});

module.exports = authRouter;