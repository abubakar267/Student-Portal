
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const Teacher = require('../../student/models/teacher');
require('dotenv').config();
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the student in the database
        const teacher= await Teacher.create({
            name,
            email,
            password: hashedPassword // Store hashed password
        });

        // Generate JWT token
        const token = teacher.createJWT();

        // Respond with success message and token
        res.status(StatusCodes.OK).json({
            teacher: {
                name: teacher.name,
                email: teacher.email,
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
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
        console.log('teacher exists');



        const isPasswordCorrect = await teacher.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        console.log('ppassword is correct');

        const token = teacher.createJWT();
        res.status(StatusCodes.OK).json({
            teacher: {
                name: teacher.name,
                email: teacher.email,
                token
            }
        });
        console.log(teacher);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Login failed', error });
    }
}

module.exports = {
    register,
    login
}
