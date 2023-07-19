//Create web server with express
const express = require('express');
const app = express();
//Create middleware
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const comments = require('../data/comments');
const {check, validationResult} = require('express-validator');

//GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if (found) {
        res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No comment with the id of ${req.params.id}`});
    }
});

//POST /comments
app.post('/comments', jsonParser, [
    check('comment').isLength({min: 5}).withMessage('Comment must be at least 5 characters long')
], (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment,
    };

});
