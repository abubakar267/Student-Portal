const mongoose = require('mongoose');

// Define the Attendance schema
const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status:{
    type: String,
    required: true,
    enum: ['Present', 'Absent', 'Late'],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  courseCode : {
    type:String,
    required: true,
   
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
