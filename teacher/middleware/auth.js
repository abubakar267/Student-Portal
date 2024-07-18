const { StatusCodes } = require('http-status-codes');
const Teacher = require('../../student/models/teacher');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
    }
    req.teacher = teacher;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not authorized to access this route' });
  }
};

module.exports = authenticateUser;
