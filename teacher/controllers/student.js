const { StatusCodes } = require('http-status-codes');
const Courses = require('../../student/models/course')
const Enrollment = require('../../student/models/enroll')
const Teacher = require('../../student/models/teacher')
const Marks = require('../../student/models/marks')
const Students = require('../../student/models/student')
const mongoose = require('mongoose');




const getStudents = async (teacherId,currentCourseCode,req,res) => {
    try {

        console.log('get students fucntion');

        console.log(teacherId);
       

        const courseCode = currentCourseCode
        const myStudents = await Courses.find({teacherId,courseCode})
        console.log(myStudents);
        const studentIds = myStudents.map(student => student.studentId);

        //here the student inside the bracket represent each element
        //to collect ids of each student and convert into a single object to pass as 
        //a response

        console.log(studentIds);

        const studentDetails = await Students.find({ _id: studentIds });
        

        // const id = myStudents.studentId;
        // const studentNames = await Students.find({_id:id})
        // console.log(studentNames);


        // if(!myStudents){
        //     return res.status(StatusCodes.BAD_REQUEST).json({message:"No students reigstered"})
        // }
     
        const studentNames = studentDetails.map(student => student.name);
        console.log(studentNames);


         res.status(StatusCodes.OK).json({
            myStudents,
            studentIds,
            studentNames
        })


        
    } catch (error) {
    console.log('error is ',error);
    res.status(500).json({ message: 'An error occurred', error });
}
}










module.exports = getStudents
