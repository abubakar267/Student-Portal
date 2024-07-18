const express = require('express')
const Course = require('../models/course');
const Student = require('../models/student')
const router = express.Router()
const authenticateUser = require('../middleware/auth');
const authfunc = require('../controllers/authenticate');
// Protect all routes in this router with authentication middleware
router.use(authenticateUser);
const {getMyCourses,getCourse,DropCourse,registerCourse,getMyMarks } = require('../controllers/courses');
    
    
    // getCourse,registerCourse,DropCourse} 



// router.route('/:id').get(getCourse).post(registerCourse).post(DropCourse)
router.get('/mycourses', getMyCourses);
router.get('/course/:id',authenticateUser,getCourse);
router.delete('/course/:id',authenticateUser,(req,res)=>{
    const studentId = req.student
    DropCourse(studentId,req,res)

});
router.get('/registerCourse',(req,res)=>{
            // Extract the course ID from the URL
            const courseNames = Course.schema.path('courseName').enumValues;
            const courseCodes = Course.schema.path('courseCode').enumValues;
            const courseDescription = Course.schema.path('description').enumValues;
            const creditHours = Course.schema.path('creditHours').enumValues;
            res.json({courseNames,courseCodes,courseDescription,creditHours});
            
});

router.post('/registerCourse',registerCourse)

router.get('/mycourses/:id', getMyMarks);

module.exports = router


