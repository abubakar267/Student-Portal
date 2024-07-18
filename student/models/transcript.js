const mongoose = require('mongoose');

// Define the Transcript schema
const transcriptSchema = new mongoose.Schema({
  courses: [{
    courseName: String,
    grade: String,
  }],
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
});

const Transcript = mongoose.model('Transcript', transcriptSchema);

module.exports = Transcript;
