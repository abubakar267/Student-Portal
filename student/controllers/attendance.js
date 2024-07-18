const Course = require('../models/course');
const Enrollment = require('../models/enroll');
const Teacher = require('../models/teacher');
const Attendance = require('../models/attendence');
const mongoose = require('mongoose');

require('dotenv').config();
const { StatusCodes } = require('http-status-codes');

let currentCourseCode = null;

const getAttendance = async (student, req, res) => {
    console.log("attendance controller");
    const studentId = student._id.toString(); // Convert ObjectId to string
    console.log(studentId);
    console.log(currentCourseCode);
    
    try {
        const attendance = await Attendance.find({ 
            studentId: studentId, // Use the string representation of the ObjectId
            courseCode: currentCourseCode
        });

        console.log(attendance);

        res.status(StatusCodes.OK).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching attendance', error });
    }
};

const setCourseCode = async (code, req, res) => {
    console.log('set controller');
    let id = code.courseId;
    currentCourseCode = id;
    console.log(currentCourseCode);
    res.status(StatusCodes.OK).json(code);
};

module.exports = { getAttendance, setCourseCode };
