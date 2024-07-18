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
    maxlength: 10,
    unique:false
  },
  courseName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 300,

  },
  creditHour: {
    type: String,
    required: true,
    maxlength: 10
  }
});



const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
