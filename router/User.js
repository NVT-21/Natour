const express = require('express');
const controllerUser = require('../controllers/controllerUser');
const router = express.Router();

router.post('/signUp',controllerUser.signUp);
router.post('/login',controllerUser.Login);
router.post('/sendFogotPassword',controllerUser.sendForgotPassword);
router.post('/forgotPassword/:token',controllerUser.forgotPassword);
router.post('/updatePassword',controllerUser.Protect,controllerUser.updatePassword);
router.patch('/updateUser',controllerUser.Protect,controllerUser.updateUser);
module.exports = router;
