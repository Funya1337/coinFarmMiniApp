const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

function tmp(req, res) {};

router.post('/:uid/click/add/:amount', controllers.user.addClicks);

module.exports = router;