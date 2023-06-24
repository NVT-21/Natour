const Tours=require('../models/Tours.js');
const User=require('../models/User.js');
const appErrors=require('../utils/appError.js');
var jwt = require('jsonwebtoken');
const catchAsync=require('../utils/asyncError.js');
const multer = require('multer');
const sendEmail = require('../utils/sendEmail.js');
const sharp = require('sharp');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/users')
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split('/')[1]
      cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
    }
  })
  const imageFilter = (req, file, cb) => {
    // Kiểm tra phần mở rộng của tệp
    if (file.mimetype.startsWith('image')) {
      // Được coi là tệp hình ảnh
      cb(null, true);
    } else {
      // Không phải tệp hình ảnh
      cb(new appErrors('Only image files are allowed!',400), false);

    }
  };
  const upload = multer({

    storage: storage,
    fileFilter: imageFilter });

  
const filterUser = (obj, ...fields) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      if (fields.includes(key)) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };
  


class controllerUser {
   
    signUp= catchAsync(async (req, res,next) => {
        const password = req.body.password;
        const email = req.body.email;
        const username = req.body.username;
        const passwordConfirm=req.body.passwordConfirm;
        const user =  new User({username, email, password, passwordConfirm});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES});
        
        
       
        const newUser=await User.create(user);
        res.status(200).json({
            status: 'success',
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
            
             
     
              req.session.user = user; // Lưu thông tin người dùng vào session
              res.locals.user = user;

            res.status(200).json({
                status: 'success',
                user,
                token
            })

        })

        logOut=catchAsync(async (req, res) => {
            
              
            const token = jwt.sign({ id: '12'}, process.env.JWT_LOGOUT, { expiresIn: '10000s' });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 10000   
              });
            res.status(200).json({
               
                status:"success",
                token
            })
        })
        Protect=catchAsync(async (req, res, next) =>{
            
            
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
              token = req.headers.authorization.split(" ")[1];
            }
            else if (req.cookies.token){
                token = req.cookies.token;
                
            }
        
           
            
            if (!token){
                return next (new appErrors('ban chua dang nhap',400));
            }
            try {
                var decoded = jwt.verify(token, process.env.JWT_SECRET);
                
              }
             catch (err) {
                return next (new appErrors("token bi loi",400) );
              }
            
           var freshUser = await User.findById(decoded.id);
           if (!freshUser){
            return next (new appErrors('tai khoan cua ban khong ton tai',400));
           }
           
           if(!freshUser.compareTime(decoded.iat)){
            return next (new appErrors('tai khoan da duoc thay doi mat khau',400));
           }
           req.locals = req.locals || {}; // Khởi tạo đối tượng req.locals nếu nó chưa tồn tại
            req.locals.user = freshUser; // Gán giá trị freshUser cho thuộc tính user

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
            res.status(200).json({status:"success"});
        })
        updateUser=catchAsync(async(req,res,next)=>{
            
           console.log(req.body);
           
            const dataUpdate=filterUser(req.body,"username");
            console.log(req.file)
            if(req.file){dataUpdate.photo=req.file.filename}
            console.log(dataUpdate)
           
            
            const newUser=await User.findByIdAndUpdate(req.user._id,dataUpdate,{
                new:true,
                runValidators:true,
            })
           
            
            res.status(200).json({status:"success",newUser});
            
        })
        updatePhoto = upload.single('photo');
        resizeUserPhoto = catchAsync(async(req,res,next)=>{
            if(!req.file){return next();}
           req.file.filename=` user-${req.user.id}-${Date.now()}.jpeg`
           sharp(req.file.buffer)
           .resize(500,500)
           .toFormat('jpeg')
           .jpeg({quality:90})
           .toFile(`public/img/users/${req.file.filename}`)
           next()
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