const mongoose = require('mongoose');
const Tour = require('../models/Tours');
connect=async()=>{
    try{

        await mongoose.connect('mongodb+srv://VanToan:toan123456@cluster0.euq2ksk.mongodb.net/natours?retryWrites=true&w=majority'
            
        )
        console.log('sucessfully connected');
    }
    catch(err){
        console.log("Không kết nối được ");
    }
    
}
module.exports = connect;
