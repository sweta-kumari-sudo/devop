
//connecting to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StudentDB' , { useNewUrlParser: true}, (err) => {
    if(!err){
        console.log("MongoDb Connection Succeeded..");
    }else{
        console.log("Error in Connection: " +err);
    }
});
require('./student.model');