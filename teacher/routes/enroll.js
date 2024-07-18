const express = require('express');
const router = express.Router();
// const { register, login } = require('../controllers/auth');
const {getallCourses,getMyCourses} = require('../controllers/enroll')
const authenticateUser = require('../middleware/auth');
const authfunc = require('../controllers/authenticate');
const Course = require('../../student/models/course')


router.get('/enroll',authenticateUser, (req,res)=>{
    const courseNames = Course.schema.path('courseName').enumValues;
    const courseCodes = Course.schema.path('courseCode').enumValues;
    const courseDescriptions = Course.schema.path('description').enumValues;
    const creditHours = Course.schema.path('creditHours').enumValues;
    const teacherId = req.teacher._id;
    res.json({courseNames,courseCodes,teacherId,courseDescriptions,creditHours});
})

router.post('/enroll',authenticateUser,getallCourses)


module.exports = router;


