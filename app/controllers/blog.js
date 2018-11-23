const express = require('express');
const router = express.Router();
const fs = require('fs');
const Article = require('../models/article');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

module.exports = (app) => {
    app.use('/food', router);
};

router.get('/', (req, res, next) => {
    readdir(path.resolve(__dirname, '../posts/'))
    .then(files => {
        let newItems = [];
        files.forEach(item => {
           newItems.push(item.replace('.md', ''));
        });
        res.render('bloglist', {
            items: newItems,
            title: ' '
        });
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
