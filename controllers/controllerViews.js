const Tours=require('../models/Tours.js');
const catchAsync=require('../utils/asyncError.js');
const User=require('../models/User.js');
const myBooking=require('../models/myBooking.js');
const handlebars = require('handlebars');
const fs = require('fs');



const path = require('path');


const template = fs.readFileSync('views/emails/email.hbs', 'utf8');


const compiledTemplate = handlebars.compile(template);


var jwt = require('jsonwebtoken');
class controllerViews{
   
getOverViews=catchAsync(async(req,res,next)=>{
        var tours= await Tours.find();
       

        
        
    
        
        tours=tours.map(tour=>tour.toObject())
        
        // res.send(compiledTemplate())


        res.render('home',{
            tours
        });
 
})
getTour=catchAsync(async(req,res,next)=>{
    var tour = await Tours.findOne({ slug: req.params.slug });
    tour = tour.toObject();
    
   
   
  
   try{

       res.render('viewTour',{
           title: tour.name,
           tour:tour
          
       })
   }
   catch(err){
    console.log(err);
   }

    })
Login=catchAsync(async (req, res, next) =>{
      res.render('Login');
})
isLogin=catchAsync(async (req, res, next) =>{
            
if (req.cookies.token) {

    let token;
    token=req.cookies.token;
    
    try{

        var decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(err){
        return next();
    }
    
   const freshUser = await User.findById(decoded.id);
  
  
  
   if (!freshUser){
    return next ();
   }
   
   if(!freshUser.compareTime(decoded.iat)){
    return next ();
   }
   res.locals.user = freshUser;
   
    return next();
} 

next();

});
getAccount=catchAsync(async(req,res,next)=>{
    res.status(200).render('getAccount');})

getTourBookings=catchAsync(async(req,res,next)=>{
    var tours= await myBooking.find();
    
    
        
    tours=tours.map(tour=>tour.toObject())
   
    res.status(200).render('myBooking',{
        tours:tours
    });
    
})
 signUp=catchAsync(async(req,res)=>{
     res.status(200).render('signUp');
})
}  



module.exports=new controllerViews