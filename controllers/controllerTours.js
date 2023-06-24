const Tours=require('../models/Tours.js');
const catchAsync=require('../utils/asyncError.js');
var myBookings=require('../models/myBooking.js');
const apiFeature=require('../utils/apiFeature.js');

class controllerTours{
    getAllTours=catchAsync(async (req,res,next)=>{
       console.log(req.query)
        const feature=new apiFeature(Tours.find(),req.query)
        .filter()
        .sort()
        .fields()
        .page()
       
        const tour=await feature.query
        
       res.json(
           {   
               tour:tour
           }
       )
    })
   
     getTour =catchAsync(  async (req,res,next)=>{
        const tour=await Tours.find({_id:req.params.id})
        res.status(200).json(
            {   
                tour:tour
            }
        )
    })
     deleteTour=catchAsync(async(req,res,next)=>{
        const tour=await Tours.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:"success"
        })})
     createTour=catchAsync(async(req,res,next)=>{
        const tour=req.body;
        
        const newTour=await Tours.create(tour);
        res.status(200).json(
            {
                tour:newTour
            }
        )

    })
    async updateTour(req,res,next){
        const tour=req.body;
        const updateTour=await Tours.findByIdAndUpdate(req.params.id, tour,{
            new: true,
            runValidators: true
        })
        res.status(200).json({
            tour:updateTour
        })


    }
    addTourBooking=catchAsync(async(req,res,next)=>{
        var tour = await Tours.findOne({ slug: req.params.slug });
        tour = tour.toObject();
        const tourBooking=await myBookings.create(tour)
        res.status(200).send(tourBooking);
    })

    }


module.exports = new controllerTours

