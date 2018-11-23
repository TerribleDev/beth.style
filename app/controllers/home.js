const express = require('express');
const router = express.Router();
const Article = require('../models/article');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {

  res.sendfile('app/views/index.html');
});
