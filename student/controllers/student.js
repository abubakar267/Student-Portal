const Student = require('../models/student');
const { StatusCodes } = require('http-status-codes');

const getStudent = async (req, res) => {
    console.log('function called');
    try {
        const studentId = req.student.id;
        console.log('new', studentId);
        const student = await Student.findOne({ _id: studentId });
        res.status(StatusCodes.OK).json({ student });
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching student', error });
    }
};

module.exports = {
    getStudent,
};
