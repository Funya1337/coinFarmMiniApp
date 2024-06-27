const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

function tmp(req, res) {};

router.post('/:uid/click/add/:amount', controllers.user.addClicks);
router.post('/:uid/storage/add/:amount', controllers.user.addToStorage);
router.post('/:uid/click/increment', controllers.user.incrementClicks);

module.exports = router;