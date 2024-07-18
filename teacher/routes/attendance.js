const express = require('express');
const router = express.Router();
// const { register, login } = require('../controllers/auth');
// const setMarks = require('../controllers/marks')
const {getMyCourses} = require('../controllers/enroll')
const authenticateUser = require('../middleware/auth');
const authfunc = require('../controllers/authenticate');
const Marks = require('../../student/models/marks');
const setAttendence = require('../controllers/attendance');






// router.post('/addMarks',authenticateUser,setMarks)


router.get('/attendance',authenticateUser,async (req,res)=>{
    try {
        const teacherId = req.teacher._id;
        // Assuming you want to fetch courses related to this teacher
        const courses = await getMyCourses(teacherId);
        console.log(courses);
        res.json({ teacherId, courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
})







// router.post('/attendance/:id',authenticateUser,async (req,res)=>{
//     try {
//         const teacherId = req.teacher._id;
//         // Assuming you want to fetch courses related to this teacher
//         const courses = await setAttendence(teacherId,course);
//         console.log(courses);
//         res.json({ teacherId, courses });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// })




module.exports = router;


