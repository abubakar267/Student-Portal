require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('../student/db/connect');
const authenticateUser = require('./middleware/auth');
const authRouter = require('./routes/auth');
const enrollRouter = require('./routes/enroll');
const studentRouter = require('./routes/student');
const attendanceRouter = require('./routes/attendance');
const marksRouter = require('./routes/marks');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api', authenticateUser, enrollRouter);
app.use('/api', authenticateUser, marksRouter);
app.use('/api', authenticateUser, studentRouter);
app.use('/api', authenticateUser, attendanceRouter);

// Static file routes
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, './public/register.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, './public/signin.html')));
app.get('/home', (req, res) => res.sendFile(path.resolve(__dirname, './public/home.html')));
app.get('/enroll', (req, res) => res.sendFile(path.resolve(__dirname, './public/enroll.html')));
app.get('/portal', (req, res) => res.sendFile(path.resolve(__dirname, './public/portal.html')));
app.get('/marks', (req, res) => res.sendFile(path.resolve(__dirname, './public/marks.html')));
app.get('/students', (req, res) => res.sendFile(path.resolve(__dirname, './public/students.html')));
app.get('/marks/:id', (req, res) => res.sendFile(path.resolve(__dirname, './public/students.html')));
app.get('/attendance', (req, res) => res.sendFile(path.resolve(__dirname, './public/attendance.html')));
app.get('/studentAttendance', (req, res) => res.sendFile(path.resolve(__dirname, './public/studentAttendance.html')));
app.get('/attendance/:id', (req, res) => res.sendFile(path.resolve(__dirname, './public/studentAttendance.html')));
app.get('/view', (req, res) => res.sendFile(path.resolve(__dirname, './public/viewAttendance.html')));
// app.get('/view/:id', (req, res) => res.sendFile(path.resolve(__dirname, './public/viewAttendance.html')));

const port = process.env.PORT || 5001;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
