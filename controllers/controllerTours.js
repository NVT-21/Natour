const Tours=require('../models/Tours.js');
const catchAsync=require('../utils/asyncError.js');

class controllerTours{
    getAllTours=catchAsync(async (req,res,next)=>{
        const tour=await Tours.find();
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

    }


module.exports = new controllerTours

