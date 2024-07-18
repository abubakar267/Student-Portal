const Course = require('../models/course');
const Enrollment = require('../models/enroll');
const Teacher = require('../models/teacher');
const Marks = require('../models/marks');
const mongoose = require('mongoose');

require('dotenv').config();
const { StatusCodes } = require('http-status-codes');



const getMyTranscript = async (req,res)=>{
    console.log("transcript was clicked");
    const student = req.student

    console.log(student._id);

    

    const courses = await Course.find({ studentId: student._id  });

    const code = courses.courseCode
    const std_id = courses.studentId
    const teacher_id = courses.teacherId
    
    console.log("courses",courses);



    const marks = await Marks.find({
        
        studentId:student._id,
    
    })

    console.log("marks",marks);

    res.status(StatusCodes.OK).json({
        courses,
        marks
    })
    

}

module.exports = getMyTranscript;