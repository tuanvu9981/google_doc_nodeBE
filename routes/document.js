const express = require('express');
const documentRouter = express.Router();
const Document = require('../models/document');
const auth = require('../middleware/auth');

documentRouter.post('/doc/create', auth, async (req, res) => {
    try {
        const { createdAt } = req.body;
        let document = new Document({
            uid: req.user, // after being auth
            title: "Untitled Document",
            createdAt: createdAt
        });
        document = await document.save();
        res.json({ document });
    } catch (e) {
        res.json({ message: e.message });
    }
});

// all documents of 1 user
documentRouter.get('/doc/me', auth, async (req, res) => {
    try {
        let documents = await Document.find({ uid: req.user });
        console.log(documents);
        res.json({ documents });
    } catch (e) {
        res.json({ message: e.message });
    }
});

// update 1 document
documentRouter.put('/doc/update-title', auth, async (req, res) => {
    try {
        const { id, title } = req.body;
        const document = await Document.findByIdAndUpdate(id, { title });
        res.json({ document });
    } catch (e) {
        res.json({ message: e.message });
    }
});

// get detail of 1 document
documentRouter.get('/doc/:id', auth, async (req, res) => {
    try {
        let document = await Document.findById(req.params.id);
        res.json({ document });
    } catch (e) {
        res.json({ message: e.message });
    }
});

module.exports = documentRouter;