var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.render('main/index', { title: 'Express' });
});

module.exports = router;
