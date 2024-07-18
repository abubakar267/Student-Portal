const { StatusCodes } = require('http-status-codes');
const Courses = require('../../student/models/course')
const Enrollment = require('../../student/models/enroll')
const Teacher = require('../../student/models/teacher')
const Marks = require('../../student/models/marks')
const mongoose = require('mongoose');






const setMarks = async (courseCode, studentId, req, res) => {
    try {
        console.log("set marks called");
        const { marks } = req.body;

        // Ensure marks are valid
        if (marks < 0 || marks > 100) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Marks must be between 0 and 100' });
        }

        const updatedMarks = await Marks.findOneAndUpdate(
            { courseCode, studentId },
            { obtainedMarks: marks },
            { new: true }
        );

        if (!updatedMarks) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Marks not found for this student' });
        }

        res.status(StatusCodes.OK).json({ message: 'Marks updated successfully', updatedMarks });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred', error });
    }
};

const getMarks = async (courseCode,studentId, req, res) => {
    try {
        console.log(studentId);
        console.log('Get marks function for course:', courseCode);
        const marks = await Marks.find({ 
            courseCode:courseCode ,
            studentId:studentId
        });
        console.log(marks);
        res.status(StatusCodes.OK).json({ marks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};







const getStudents = async (teacherId,currentCourseCode,req,res) => {
    try {

        console.log('get students fucntion');

        console.log(teacherId);
       

        const courseCode = currentCourseCode
        console.log(courseCode);
        
    } catch (error) {
    console.log('error is ',error);
    res.status(500).json({ message: 'An error occurred', error });
}
}









module.exports = {setMarks,getMarks}
