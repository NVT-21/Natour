const mongoose = require('mongoose');
const fs = require('fs');
const Tours = require('../models/Tours');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const path = require('path');
const filePath = path.join(__dirname, '../dev-data/data/tours.json');

if (fs.existsSync(filePath)) {
  var tours = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  // ... rest of the code
} else {
 return  console.error(`The file "${filePath}" could not be found.`);
}

connect=async()=>{
    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/Natours')
        console.log('sucessfully connected');
    }
    catch(err){
        console.log("falies");
    }
    
}
connect();


// import 
const importData = async () => {
    try{
       await Tours.create(tours);
       console.log('sucessfully created');
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}
// delete
const deleteData = async () => {
    try{
       await Tours.deleteMany();
       console.log("delete succesful")
          
    }
    catch(err){
        console.log(err);   
   
    process.exit();
}
}

if (process.argv[2]==='import'){
    importData();
}
if (process.argv[2]==='delete'){
    deleteData();
}