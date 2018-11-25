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
const Blog = require('../models/blog');

module.exports = (app) => {
    app.use('/food', router);
};

router.get('/', async (req, res, next) => {
   let files = await readdir(path.resolve(__dirname, '../posts/'));
   let blogs = [];
   files.forEach(file => {
    let fileContent = fs.readFileSync(path.resolve(__dirname, '../posts/', file)).toString();
    let splitContent = fileContent.split('---');
    let jsonString = splitContent[0];
    let metaData = JSON.parse(jsonString);  
    let currentBlog = new Blog(metaData, '', '/food/' + file.replace('.md', ''));
    blogs.push(currentBlog);
   });
    res.render('bloglist', {
        items: blogs,
    });

    // let reads = files.map(file => readFile(path.resolve(__dirname, '../posts/', file)));
    // let fileRead = await Promise.resolve(reads);
    // console.log(fileRead);
    // .then(files => {

    //     let newItems = [];
    //     files.forEach(item => {
    //        newItems.push(item.replace('.md', ''));
    //     });
    // //     res.render('bloglist', {
    // //         items: newItems,
    // //         title: ' '
    // //     });
    // });
});

router.get('/:blogId', (req, res, next) => {
    readFile(path.resolve(__dirname, '../posts/' + req.params.blogId + '.md'))
    .then(fileContent => {
        let splitContent = fileContent.toString().split('---');
        let jsonString = splitContent[0];
        let markdownConent = splitContent[1];
        let metaData = JSON.parse(jsonString); 
        let contentAsHtml = md.render(markdownConent.toString()); 
        let currentBlog = new Blog(metaData, contentAsHtml, '/food/' + req.params.blogId);
       
        res.render('blog', currentBlog);
    })

}
)
