const Tours=require('../models/Tours.js');
const catchAsync=require('../utils/asyncError.js');
class controllerViews{
getOverViews=catchAsync(async(req,res,next)=>{
    var tours= await Tours.find();
    
    
        tours=tours.map(tour=>tour.toObject())
        res.render('home',{
            title:"Tour",
            tours:tours
        })
    

       
        // tours
    
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
      res.status(200).render('Login');
})
isLogin=catchAsync(async (req, res, next) =>{
            
if (req.cookies.jwt) {

    let token;
    token=req.cookies.jwt;
    const decoded=await verifyToken(token);
    
   const freshUser = await User.findById(decoded.id);
   if (!freshUser){
    return next ();
   }
   
   if(!freshUser.compareTime(decoded.iat)){
    return next ();
   }
   req.locals.user=freshUser;
   return next();
} 
next();

});
}   


module.exports=new controllerViews