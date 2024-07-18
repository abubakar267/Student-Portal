const Course = require('../models/course');
const Enrollment = require('../models/enroll');
const Teacher = require('../models/teacher');
const Marks = require('../models/marks');
const mongoose = require('mongoose');

require('dotenv').config();
const { StatusCodes } = require('http-status-codes');

const getMyCourses = async (req, res, sendResponse = true) => {
    console.log(' course function called');

    try {
        const studentId = req.student.id;
        console.log('new', studentId);
        const courses = await Course.find({ studentId: studentId });

        if (sendResponse) {
            res.status(StatusCodes.OK).json({ courses });
        }
        
        return courses;
    } catch (error) {
        console.error('Error fetching student:', error);
        if (sendResponse) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching student', error });
        } else {
            throw error;
        }
    }
};



const getCourse = async (req, res) => {
    console.log('get course function called');
    try {
        const courseId = req.params.id; // Ensure 'id' parameter is correctly accessed
        console.log('Course ID:', courseId); // Log courseId for debugging

        // Retrieve course from MongoDB
        const mycourse = await Course.findOne({ _id: courseId });

        if (!mycourse) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Course not found' });
        }

        console.log(mycourse);

        res.status(StatusCodes.OK).json({ mycourse });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching course', error });
    }
};

const DropCourse = async (studentId,req,res)=>{
    console.log('drop  course called');
    try {

        const courseId = req.params.id; // Ensure 'id' parameter is correctly accessed
        console.log('Course ID:', courseId); // Log courseId for debugging

        // Retrieve course from MongoDB
        const course = await Course.findOneAndDelete({ _id: courseId });
        const marks = await Marks.findOneAndDelete({ studentId: studentId });
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Course not found' });
        }

        res.status(StatusCodes.OK).json({ course });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching course', error });
    }
}


const registerCourse = async (req,res)=>{
    const name = req.body.name
    const code = req.body.code
    const description=req.body.description;
    const studentId = req.student.id;
    const creditHours=req.body.creditHours

    console.log(description);
    
    try {

        const existingCourses = await Course.findOne({ studentId: studentId, courseCode: code });
        console.log("ggg",existingCourses);

        if (existingCourses !== null) {
            console.log("not null");
            let status = false;
            return res.status(StatusCodes.CONFLICT).json({ message: 'This course is already assigned to student',status});
        }else{
            console.log(" null");

        console.log('test');
        
        // Find teachers who are teaching the specified course
        const enrollments = await Enrollment.find({ courseCode:code});

        console.log(enrollments);
        if (enrollments.length === 0) {
            let status = "NA";
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No teachers available for this course" ,status});
         }
         

         console.log("test2");

         //Select a random teacher
         const randomTeacher = enrollments[Math.floor(Math.random() * enrollments.length)];

        // console.log(randomTeacher);
        const insertedData = new Course({
            courseCode:code,
            courseName:name,
            description:description,
            studentId:studentId,
            teacherId:randomTeacher.teacher,
            creditHours:creditHours
        })


        //need to insert defaults marks 
        const insertDefaultMarks = new Marks({
            
            courseCode: code,
            totalMarks: 100,
            studentId: studentId,
            teacherId: randomTeacher.teacher,
            date: new Date("2024-07-02T14:48:00.000Z")
        })

        //....edit this
        

        await insertDefaultMarks.save();

        console.log("test3");
        
        await insertedData.save();
        console.log("test4");

        let status = true;
        res.status(StatusCodes.CREATED).json({ message: "registered",status });}
    //}
    } catch (error) {
        if (error.code === 11000) {
            let status = true;
            // Duplicate key error
            res.status(StatusCodes.CONFLICT).json({ message: "Course already registered" ,status});
        } else {
            // Other errors
            console.error('Error registering course:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error registering course', error });
        }
    }
    




    //need to check if the course if already registered for a particular student
    //if not then check which teachers are teaching the particular course
    //randomly assign the avaialble teachers teaching the particular course


    // const courseNames = Course.schema.path('name').enumValues;
    // res.json(courseNames);

}



const getMyMarks = async (req,res)=>{
    console.log("marks was clicked");
    const courseId = req.params.id
    

    const courses = await Course.findOne({ _id: courseId  });

    const code = courses.courseCode
    const std_id = courses.studentId
    const teacher_id = courses.teacherId
    
    console.log(code,std_id,teacher_id);



    const marks = await Marks.findOne({
        courseCode:code,
        studentId:std_id,
        teacherId:teacher_id
    })
  

    res.status(StatusCodes.OK).json({
        marks
    })
    

}





module.exports = {
    getMyCourses,
    getCourse,
    DropCourse,
    registerCourse,
    getMyMarks
};
