const express = require('express');
const controllerUser = require('../controllers/controllerUser');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.post('/signUp',controllerUser.signUp);
router.post('/login',controllerUser.Login);
router.post('/sendFogotPassword',controllerUser.sendForgotPassword);
router.post('/forgotPassword/:token',controllerUser.forgotPassword);
router.post('/logOut',controllerUser.logOut);
router.post('/updatePassword',controllerUser.Protect,controllerUser.updatePassword);
router.patch('/updateUser',controllerUser.Protect,controllerUser.updatePhoto,controllerUser.resizeUserPhoto,controllerUser.updateUser);
module.exports = router;
