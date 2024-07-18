const mongoose = require('mongoose');

// Define the Enrollment schema
const enrollmentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  courseCode: {
    type: String,
    required: true,
    maxlength: 10
  },
  courseName: {
    type: String,
    required: true,
    maxlength: 100
  },
  creditHours:{
    type : Number,
    required : true,
  }

});



const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;


//Note this model is to be deleted cuz its uselesss.
//Will return here to just to be proud of my progress for this project for which i told my self to not give up until completion.