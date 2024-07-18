const express = require('express')
const Course = require('../models/course');
const Student = require('../models/student')
const router = express.Router()
const authenticateUser = require('../middleware/auth');
const authfunc = require('../controllers/authenticate');
// Protect all routes in this router with authentication middleware
router.use(authenticateUser);
const getFee = require('../controllers/fee');
    
    
    // getCourse,registerCourse,DropCourse} 

// router.route('/:id').get(getCourse).post(registerCourse).post(DropCourse)
router.get('/fee',authenticateUser,getFee);

module.exports = router


