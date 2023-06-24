const mongoose = require('mongoose');
const Tour = require('../models/Tours');
connect=async()=>{
    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/Natours'
            
        )
        console.log('sucessfully connected');
    }
    catch(err){
        console.log("Không kết nối được ");
    }
    
}
module.exports = connect;
