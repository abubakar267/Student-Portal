
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const Student = require('../models/student');
require('dotenv').config();
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the student in the database
        const student = await Student.create({
            name,
            email,
            password: hashedPassword // Store hashed password
        });

        // Generate JWT token
        const token = student.createJWT();

        // Respond with success message and token
        res.status(StatusCodes.OK).json({
            student: {
                name: student.name,
                email: student.email,
                token
            }
        });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Registration failed', error });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide email and password' });
    }

    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
        console.log('student exists');



        const isPasswordCorrect = await student.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        console.log('ppassword is correct');

        const token = student.createJWT();
        res.status(StatusCodes.OK).json({
            student: {
                name: student.name,
                email: student.email,
                token
            }
        });
        console.log(student);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Login failed', error });
    }
}

module.exports = {
    register,
    login
}
