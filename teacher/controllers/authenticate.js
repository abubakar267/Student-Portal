const { StatusCodes } = require('http-status-codes');

const authfunc = async (req, res) => {
    try {
        const teacher = req.teacher;
        console.log("Authenticated teacher:", teacher);
        res.status(StatusCodes.OK).json({ teacher });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user data', error });
    }
}

module.exports = authfunc;
