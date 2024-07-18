const Course = require('../models/course');
const Enrollment = require('../models/enroll');
const Teacher = require('../models/teacher');
const Marks = require('../models/marks');
const mongoose = require('mongoose');
const {getMyCourses} = require('./courses')
const Student= require('../models/student');

require('dotenv').config();
const { StatusCodes } = require('http-status-codes');

const creditHourRate = 8500;

const getFee = async (req, res) => {
    console.log('fee function');

    try {
        const courses = await getMyCourses(req, res, false);
        let fee = 0;
        const creditHourRate = 8500; // Assuming a constant rate per credit hour

        console.log('gotmycourss', courses);

     
    courses.forEach(course =>{
        let crdthr = Number(course.creditHours)
        fee = fee + (crdthr*creditHourRate)
    })


    const studentName = await Student.findById(courses[0].studentId)
    console.log(studentName.name);
    const name = studentName.name

        
        res.status(StatusCodes.OK).json({ fee ,courses,name,creditHourRate});
    } catch (error) {
        console.error('Error calculating fee:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error calculating fee', error });
    }
};



module.exports = getFee