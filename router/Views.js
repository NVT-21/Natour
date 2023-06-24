const express = require('express');
const router = express.Router();
const controllerUser=require('../controllers/controllerUser');
const controllerViews = require('../controllers/controllerViews');
router.use(controllerViews.isLogin) // xem da dang nhap chua
console.log(controllerViews.isLogin) //
router.get('/Login', controllerViews.Login);
router.get('/me',controllerUser.Protect, controllerViews.getAccount);
router.get('/signUp', controllerViews.signUp);
router.get('/myBookings',controllerUser.Protect,controllerViews.getTourBookings)
router.get('/:slug',controllerUser.Protect,controllerViews.getTour);

router.get('/', controllerViews.getOverViews);

module.exports =router;