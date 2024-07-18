const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const authenticateUser = require('../middleware/auth');
const authfunc = require('../controllers/authenticate');

router.post('/register', register);
router.post('/login', login);
router.get('/home', authenticateUser, authfunc);  // Ensure this is correct

module.exports = router;
