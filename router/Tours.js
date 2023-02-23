const express = require('express');
const controllerTours = require('../controllers/controllerTours');
const controllerUser = require('../controllers/controllerUser');

const router = express.Router();

router.get('/getAllTours',controllerUser.Protect,controllerUser.restrictTo('admin'),controllerTours.getAllTours);
router.get('/:id',controllerTours.getTour);
router.post('/createTour',controllerTours.createTour);
router.patch('/updateTour/:id',controllerTours.updateTour);
router.delete('/deleteTour/:id',controllerTours.deleteTour);




module.exports=router

