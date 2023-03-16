const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: "No auth token" });
        }
        const verified = jwt.verify(token, JWT_KEY);
        if (!verified) {
            return res.status(401).json({ msg: 'Token is not verified! Authentication failed!' });
        }
        req.user = verified.id;
        req.token = token;
        next();
    } catch (e) {
        res.status(500).json({ msg: e.message() });
    }
}

module.exports = auth;