const routerView = require('./Views');
const routerTour = require('./Tours');
const routerUser = require('./User');
const session = require('express-session');

  

const router=(app)=>{
    app.use(
        session({
          secret: 'mysecret', // Chuỗi bí mật để mã hóa phiên
          resave: false,
          saveUninitialized: true
        })
      );
app.use('/api/Tours',routerTour);
app.use('/api/User',routerUser);
app.use((req, res, next) => {
    res.locals.user = req.session.user; // Truyền thông tin người dùng từ session vào biến cục bộ
    next();
});
  
app.use('/',routerView);


  

}  
module.exports = router