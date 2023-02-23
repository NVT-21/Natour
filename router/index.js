const routerView = require('./Views');
const routerTour = require('./Tours');
const routerUser = require('./User');
const router=(app)=>{

app.use('/api/Tours',routerTour);
app.use('/api/User',routerUser);
app.use('/',routerView);

}  
module.exports = router