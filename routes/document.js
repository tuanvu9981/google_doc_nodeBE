const express = require('express');
const documentRouter = express.Router();
const Document = require('../models/document');
const auth = require('../middleware/auth');

documentRouter.post('doc/create', auth, async (req, res) => {
    try {
        const { createdAt } = req.body;
        let document = new Document({
            uid: req.user, // after being auth
            title: "Untitled Document",
            createdAt
        });
        document = await document.save();
        res.json({ document });
    } catch (e) {
        res.json({ message: e.message });
    }
});

documentRouter.get('doc/me', auth, async (req, res) => {
    try {
        let documents = Document.find({ uid: req.user });
        res.json({ documents });
    } catch (e) {
        res.json({ message: e.message });
    }
});

module.exports = documentRouter;