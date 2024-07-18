const express = require('express');
const router = express.Router();
// const { register, login } = require('../controllers/auth');
// const setMarks = require('../controllers/marks')
const getStudents= require('../controllers/student')
const authenticateUser = require('../middleware/auth');
const authfunc = require('../controllers/authenticate');
const Marks = require('../../student/models/marks');
const Attendance = require('../../student/models/attendence');
const {getMyCourses} = require('../controllers/enroll')
const {setMarks,getMarks} = require('../controllers/marks')
const {setAttendance,getAttendance,setId,editAttendance} = require('../controllers/attendance')
// const { get } = require('mongoose');




let currentCourseCode = null;
let currentStudent = null;

router.post('/students', authenticateUser, (req, res) => {
    currentCourseCode = req.body.courseCode;
    res.status(200).json({ message: 'Course code received', courseCode: currentCourseCode });
});


// router.post('/addMarks',authenticateUser,setMarks)


router.get('/students',authenticateUser,async (req,res)=>{
    try {
        const teacherId = req.teacher._id;
        console.log("Current Course Code:", currentCourseCode);
        console.log(currentCourseCode);
        // Assuming you want to fetch courses related to this teacher
        // const courses = await getMyCourses(teacherId);
        // console.log(courses);
        await getStudents(teacherId,currentCourseCode,req,res);


        // res.json({ teacherId});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
})


router.get('/marks/:id', authenticateUser, async (req, res) => {
    try {
        const courseCode = currentCourseCode
        const studentId = req.params.id;
        await getMarks(courseCode,studentId, req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
});


router.post('/marks/:id', authenticateUser, async (req, res) => {
    try {
        const courseCode = currentCourseCode;
        const studentId = req.params.id;
        await setMarks(courseCode, studentId, req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
});

router.post('/attendance/:id',authenticateUser,async (req,res)=>{
    try {

        const teacherId = req.teacher._id;
        const courseCode = currentCourseCode;
        const studentId = req.params.id;
        console.log("data1",req.body);
        console.log(teacherId);
        // Assuming you want to fetch courses related to this teacher
        await setAttendance(studentId,courseCode,req,res);
        // console.log(attendance);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
})


router.get('/attendance/:id',authenticateUser,async (req,res)=>{
    try {

        const status = Attendance.schema.path('status').enumValues;
        res.json({status });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
})


router.patch('/attendance/:id',authenticateUser,async (req,res)=>{
    try {
        const studentId = req.body.stdid;
        const status = Attendance.schema.path('status').enumValues;
        console.log('in patch router');
        console.log(studentId,currentCourseCode);
        await setId(studentId)


        await editAttendance(studentId,currentCourseCode,req,res)

        // res.json({status });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
})

// router.get('/view/:id', authenticateUser, async (req, res) => {
//     try {
//         console.log("rout4erhtfhh");
//         const studentId = req.params.id;
//         await getAttendance(currentCourseCode, studentId, req, res);
//     } catch (error) {
//         console.log('aaa');
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// });

router.get('/view', authenticateUser, async (req, res) => {
    try {
        console.log("rout4er");
        const attendanceRecords = await getAttendance(currentCourseCode, req, res); // Assuming your getAttendance can handle this
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.log('aaa');
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
});


// router.post('/view', authenticateUser,getAttendance)

// router.post('/view', authenticateUser, async (req, res) => {
//     try {
//         const { id } = req.body;

//         const attendanceRecords = await getAttendance(currentCourseCode, id, req, res); // Assuming your getAttendance can handle this
//         res.status(200).json(attendanceRecords);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// });





router.post('/view', authenticateUser, async (req, res) => {
    try {
        const { id } = req.body;

        await setId(id,req, res); // Assuming your getAttendance can handle this
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
});



module.exports = router;


