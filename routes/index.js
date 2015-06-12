
var express = require('express');
var router = express.Router();
var bulk = require('../controllers/bulk')
var iso = require('../controllers/iso')
var site = require('../controllers/site')


router.get('/',site.index)
router.get('/bulk',bulk.convert)
router.get('/iso',iso.convert)
router.post('/bulk',bulk.convert)
router.post('/iso',iso.convert)

module.exports=router

