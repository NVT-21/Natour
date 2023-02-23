const express = require('express');
const router = express.Router();
const controllerViews = require('../controllers/controllerViews');
router.use(controllerViews.isLogin)
router.get('/Login', controllerViews.Login);
router.get('/:slug',controllerViews.getTour);
router.get('/', controllerViews.getOverViews);

module.exports =router;