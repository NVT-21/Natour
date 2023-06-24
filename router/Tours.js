const express = require('express');
const controllerTours = require('../controllers/controllerTours');
const controllerUser = require('../controllers/controllerUser');

const router = express.Router();

router.get('/getAllTours',controllerTours.getAllTours);
router.get('/:id',controllerTours.getTour);
router.post('/tourBookings/:slug',controllerUser.Protect,controllerTours.addTourBooking);
router.post('/createTour',controllerTours.createTour);
router.patch('/updateTour/:id',controllerTours.updateTour);
router.delete('/deleteTour/:id',controllerTours.deleteTour);




module.exports=router

