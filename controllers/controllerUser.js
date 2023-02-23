const Tours=require('../models/Tours.js');
const User=require('../models/User.js');
const appErrors=require('../utils/appError.js');
var jwt = require('jsonwebtoken');
const catchAsync=require('../utils/asyncError.js');
const sendEmail = require('../utils/sendEmail.js');
const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      return next (new appErrors("token bi loi",400) );

    }
  };
const filterUser=(obj,...field)=>{
    const newObj={};
    Object.keys(obj).forEach(el=>{
        if (field.includes(el) )newObj[el] = obj[el];
    })
    return newObj;
        
 
}
class controllerUser {
   
    signUp= catchAsync(async (req, res,next) => {
        const password = req.body.password;
        const email = req.body.email;
        const username = req.body.username;
        const passwordConfirm=req.body.passwordConfirm;
        const user =  new User({password, email, username, passwordConfirm});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES});
        
        
       
        const newUser=await User.create(user);
        res.status(200).json({
            newUser: newUser,
            token
        })
    })
        
        Login= catchAsync(async (req, res,next) =>{
            const email = req.body.email;
            const password = req.body.password;
            if (!email||!password) {
                return next (new appErrors('no fill email or password',400));
            }
            const user =await User.findOne({email}).select('+password');
            if (!user||!(await user.correctPassword(password,user.password))){
                return next (new appErrors('email or password incorrect',400));
            } 
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES});
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 // 24 hours
              });
            res.status(200).json({
                user,
                token
            })

        })
        Protect=catchAsync(async (req, res, next) =>{
            
            
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
              token = req.headers.authorization.split(" ")[1];
            }
            
            if (!token){
                return next (new appErrors('ban chua dang nhap',400));
            }
            const decoded=await verifyToken(token);
            
           const freshUser = await User.findById(decoded.id);
           if (!freshUser){
            return next (new appErrors('tai khoan cua ban khong ton tai',400));
           }
           
           if(!freshUser.compareTime(decoded.iat)){
            return next (new appErrors('tai khoan da duoc thay doi mat khau',400));
           }
           req.user=freshUser;
           next();

        });
        restrictTo=(...roles)=>{
            return (req, res, next) => {
                if(!roles.includes(req.user.role)){
                   return next(new appErrors('khong co quyen truy cap',400));
                }
                
                next();
            }
            
            
        }
        sendForgotPassword=catchAsync(async(req,res,next) => {
            const user = await User.findOne({ email:req.body.email });
            if (!user) return res.status(400).send({ msg: 'Email not found' });
            const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            // Save reset token to user
            user.resetToken = resetToken;
            user.resetTokenExpiry = Date.now() + 20 * 60 * 1000;
            await user.save({validateBeforeSave:false});
            // message
            const message =`"ban da quen mat khau day la ma de dat lai mat khau ${resetToken}"`;
            
            try{
                await sendEmail({
                    message:message,
                    email:user.email,
                    subject:'forgot Pawword',

                })
                res.status(200).json({
                    sucsees:"thanh cong"
                })
            }
            catch(err){
                user.resetToken=undefined;
                user.resetTokenExpiry=undefined
                console.error("loi");

            }
        });
        forgotPassword=catchAsync(async (req,res,next) => {
            const token = req.params.token;
            const {password,passwordConfirm}=req.body;
            console.log({password:password,passwordConfirm:passwordConfirm});
            if(!token){
                return next(new appErrors("ban chua co ma de doi mat khau",400));
            }
            const decoded=await verifyToken(token);
           
            const user= await User.findById({_id:decoded.id,resetTokenExpiry:{$gt:Date.now()}});
            
            if (user){
                user.password=password;
                user.passwordConfirm=passwordConfirm;
                user.resetToken=undefined;
                user.resetTokenExpiry=undefined;
                await user.save();
                res.status(200).json({sucsees:"success"});
            }
            else{
                console.log("loi");
            }

        })
        updatePassword=catchAsync(async(req,res,next)=>{
            const { currentPassword, newPassword, newPasswordConfirm } = req.body;
            const user = req.user;
            
            const isMatch = await user.correctPassword(currentPassword,user.password);
                if (!isMatch) {
                return next(new appErrors( 'Current password is incorrect',400 ));
                         }
            user.password = newPassword;
            user.passwordConfirm = newPasswordConfirm;
            user.createdAt = Date.now();
            user.save();
            res.status(200).json({success:"success"});
        })
        updateUser=catchAsync(async(req,res,next)=>{
            const dataUpdate=filterUser(req.body,"email","username");
            const newUser=await User.findByIdAndUpdate(req.user._id,dataUpdate,{
                new:true,
                runValidators:true,
            })
            res.status(200).json(newUser);
            
        })
        inActiveUser = catchAsync(async(req,res,next)=>{
            const user=req.user;
            if (user){
                user.active=false;
                await user.save();

            }
            else{
                return next(new appErrors("loi khong co tai khoan",400));
            }
        })
        



}
module.exports = new controllerUser;