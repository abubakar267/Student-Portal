const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

  courseCode:{
    type: String,
    required: true,
    enum: [
        'CS1004',
        'MATH1010',
        'PHYS1001',
        'CHEM1010',
        'BIO1010',
        'ENG1020',
        'HIST1005',
        'PSY1010',
        'ECON1010',
        'ART1001'
      ]
  },
 courseName: {
    type: String,
    required: true,
    enum: [
        'Object Oriented Programming',
        'Calculus I',
        'General Physics I',
        'General Chemistry I',
        'General Biology I',
        'English Composition',
        'World History I',
        'Introduction to Psychology',
        'Principles of Economics',
        'Art Appreciation'
      ]
  },
  
  description: {
    type: String,
    required: true,
    enum: [
      'An introduction to object-oriented programming concepts and techniques.',
      'Study of limits, derivatives, and integrals of functions of one variable.',
      'Introduction to the principles of mechanics, heat, and sound.',
      'Fundamentals of chemistry, including atomic structure, bonding, and reactions.',
      'Introduction to the principles of biology, including cell structure and function.',
      'Development of writing skills with emphasis on composition and rhetoric.',
      'A survey of world history from ancient times to the modern era.',
      'Introduction to the scientific study of behavior and mental processes.',
      'Basic principles of macroeconomics and microeconomics.',
      'Exploration and appreciation of visual arts from different cultures and periods.'
    ]
  },
  creditHours: {
    type: String,
    required: true,
    enum: [
      '3', // CS1004: Object Oriented Programming
      '4', // MATH1010: Calculus I
      '4', // PHYS1001: General Physics I
      '4', // CHEM1010: General Chemistry I
      '4', // BIO1010: General Biology I
      '3', // ENG1020: English Composition
      '3', // HIST1005: World History I
      '3', // PSY1010: Introduction to Psychology
      '3', // ECON1010: Principles of Economics
      '3'  // ART1001: Art Appreciation
    ]
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    // unique:true
  },
  teacherId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;


