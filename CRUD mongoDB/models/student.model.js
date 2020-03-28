//creating schema for our database

const mongoose = require('mongoose');
let studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'This field is required'
},
    lastName: {
        type: String,
        required: 'This field is required'
}
});



mongoose.model('Student' , studentSchema);
