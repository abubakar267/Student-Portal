const { StatusCodes } = require('http-status-codes');
const Courses = require('../../student/models/course');
const Enrollment = require('../../student/models/enroll');
const Teacher = require('../../student/models/teacher');
const mongoose = require('mongoose');

const getallCourses = async (req, res) => {
    try {
        const teacherId = req.body.teacherId;
        const courseCode = req.body.clickedCourse;
        const courseName = req.body.courseName;
        const description = req.body.courseDescription;
        const creditHour = req.body.creditHour;

        console.log(courseCode, courseName, creditHour);
        console.log("Authenticated teacher:", teacherId);

        const existingEnrollment = await Enrollment.findOne({ teacher: teacherId, courseCode: courseCode });

        if (existingEnrollment) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'This course is already assigned to the teacher', status: "already" });
        }

        const noOfCourses = await Enrollment.find({ teacher: teacherId });
        console.log(noOfCourses.length);

        if (noOfCourses.length >= 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Teaching limit already met', status: "met" });
        }

        const enrollment = new Enrollment({
            teacher: teacherId,
            courseName: courseName,
            courseCode: courseCode,
            description: description,
            creditHour: creditHour
        });

        await enrollment.save();

        console.log("Enrollment created");

        return res.status(StatusCodes.OK).json({
            enrollment: {
                courseCode: enrollment.courseCode,
            }, status: "done"
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(StatusCodes.CONFLICT).json({ message: "Course already registered", status: "duplicate" });
        } else {
            console.error('Error registering course:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error registering course', error, status: "error" });
        }
    }
};

const getMyCourses = async (teacherId) => {
    try {
        const courses = await Enrollment.find({ teacher: teacherId });
        return courses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw new Error('Error fetching courses');
    }
};

module.exports = { getallCourses, getMyCourses };
