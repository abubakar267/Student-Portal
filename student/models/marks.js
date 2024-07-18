const mongoose = require('mongoose');

// Define the Marks schema
const marksSchema = new mongoose.Schema({
  obtainedMarks: {
    type: String,  // i made this string in order to show "-/100" for marks not assigned
    required: true,  // Making this field required
    default : "-" ,
    min: 0           // Minimum value for obtained marks
  },
  courseCode: {
    type: String,
    required: true,  // Making this field required
    trim: true       // Trimming whitespace
  },
  totalMarks: {
    type: Number,
    required: true,  // Making this field required
    default : 100           // Minimum value for total marks
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to a student
    ref: 'Student',                        // Referencing the 'Student' collection
    required: true                        // Making this field required
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to a student
    ref: 'Teacher',                        // Referencing the 'Student' collection
    required: true                        // Making this field required
  },
  date: {
    type: Date,
    default: Date.now  // Default value is the current date
  }
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
