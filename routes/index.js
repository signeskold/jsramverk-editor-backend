var express = require('express');
var router = express.Router();
const cors = require('cors');
const documents = require("../models/documents.js");

router.use(cors());
router.options('*', cors());

router.get('/', cors(), (req, res) => {
    const data = {
        data: {
            msg: "Application programming interface for creating, reading and updating documents."
        }
    };

    res.json(data);
});

// Create new document.
router.post('/docs/create', cors(), (req, res) => {
    documents.create(res, req.body.title, req.body.text);
});

// Reset documents.
router.get('/init', cors(), (req, res) => {
    documents.init(res);
});

// Read all documents.
router.get('/docs', cors(), (req, res) => {
    documents.readAll(res);
});

// Read one document.
router.get('/docs/:id', cors(), (req, res) => {
    documents.read(res, req.params.id);
});

// Update existing document.
router.put('/docs/update', cors(), (req, res) => {
    documents.update(res, req.body.id, req.body.title, req.body.text);
});

module.exports = router;
