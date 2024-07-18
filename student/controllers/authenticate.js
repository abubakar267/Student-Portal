const { StatusCodes } = require('http-status-codes');

const authfunc = async (req, res) => {
    try {
        const student = req.student;
        console.log("Authenticated student:", student);
        res.status(StatusCodes.OK).json({ student });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user data', error });
    }
}

module.exports = authfunc;
