const express = require('express');
const router = express.Router();
const { getStudent } = require('../controllers/student');

router.get('/home', getStudent);  // Ensure getStudent is correctly imported and used

module.exports = router;
