const express = require('express')
const Course = require('../models/course');
const Student = require('../models/student')
const router = express.Router()
const authenticateUser = require('../middleware/auth');
const authfunc = require('../controllers/authenticate');
// Protect all routes in this router with authentication middleware
router.use(authenticateUser);
const {getAttendance,setCourseCode}= require('../controllers/attendance');


router.post("/view",authenticateUser,async (req,res)=>{
    console.log('post  view router fxgmd');
    console.log(req.body);
    let code = req.body
    await setCourseCode(code,req,res)
    

})

router.get("/view",authenticateUser,async (req,res)=>{
    console.log('view router fxgmd');
    console.log('std id',req.Student);
    const id = req.student
    await getAttendance(id,req,res)

})

module.exports = router;