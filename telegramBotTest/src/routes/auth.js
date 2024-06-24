const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

function tmp(req, res) {};

router.post('/verify', middlewares.checkSignature, controllers.auth.verify);

module.exports = router;