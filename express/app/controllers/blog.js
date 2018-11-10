const express = require('express');
const router = express.Router();
const fs = require('fs');
const Article = require('../models/article');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);

module.exports = (app) => {
    app.use('/food', router);
};

router.get('/', (req, res, next) => {
    const articles = [new Article(), new Article()];
    res.render('index', {
        title: 'I"m food',
        articles: articles
    });
});

router.get('/:blogId', (req, res, next) => {
    readFile(path.resolve(__dirname, '../posts/' + req.params.blogId + '.md'))
    .then(markdownConent => {
        let contentAsHtml = md.render(markdownConent.toString());
        res.render('blog', {
            title: req.params.blogId,
            content: contentAsHtml
        });
    })

}
)
