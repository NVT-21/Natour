const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    // select: false,
  },
  active:
  { type: Boolean, 
    default: true },
  
  role:{
    type: String,
    default:'User',
    erum:['user', 'admin','guide',],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  photo:{type: String,default:'default.jpg'},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken:String,
  resetTokenExpiry:Date,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // xem rang password da duoc sua chua , neu khong co thay doi thi next con neu co thi chay dong code duoi

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (passwordLogin,passwordData){
    return await bcrypt.compare(passwordLogin, passwordData);

}
userSchema.methods.compareTime = async function (tokenTime){
  if (this.createdAt){

    var createAtInSeconds = new Date(this.createAt).getTime() / 1000;
  }
  tokenTime = Math.floor(Date.now() / 1000);
  console.log(tokenTime);
  return tokenTime >createAtInSeconds;



}
userSchema.pre(/^find/,function(next){
  this.find({active: {$ne:false}});
  next();
})
const User = mongoose.model('User', userSchema);

module.exports = User;

