require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/auth');
const authRouter = require('./routes/auth');
const Marks = require('./models/marks')
const Course = require('./models/course')

// Import routes
const studentRouter = require('./routes/student');
const attendanceRouter = require('./routes/attendence');
const courseRouter = require('./routes/course');
const feeRouter = require('./routes/fee');
const marksRouter = require('./routes/marks');
const teacherRouter = require('./routes/teacher');
const transcriptRouter = require('./routes/transcript');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter)
// app.use('/api/student', authenticateUser,studentRouter)
app.use('/api', authenticateUser, attendanceRouter);
app.use('/api', authenticateUser,courseRouter);


app.use('/api', authenticateUser, feeRouter);
// app.use('/api/mymarks', authenticateUser, marksRouter);
// app.use('/api/teacher', authenticateUser, teacherRouter);
app.use('/api', authenticateUser, transcriptRouter);

// Static file routes
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/signin.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/home.html'));
});

app.get('/mycourses', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/mycourses.html'));
});

app.get('/registerCourse', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/registerCourse.html'));
});

app.get('/transcript', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/transcript.html'));
});

app.get('/attendance', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/attendanceCourses.html'));
});
app.get('/view', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/view.html'));
});

app.get('/fee', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/fee.html'));
});



// const insertSampleData = async () => {

//     const course = await Course.create({
//         courseName: 'Calculus 102',
//         description: 'Introduction to Calculus',
//         creditHours: 4,
//         studentId: '667afb1251c0964b093ac320',
//         teacherId: '667afb1251c0964b093ac667'
//     });

//     console.log('Sample data inserted:', course);
// };

// const sampleMarksData = [
//     {
//       obtainedMarks: "85/100",
//       courseCode: "PSY1010",
//       totalMarks: 100,
//       studentId: "667afb1251c0964b093ac320",
//       teacherId: "667f2db346df3b098e8338b0",
//       date: new Date("2024-07-02T14:48:00.000Z")
//     }]

    // const insertSampleData = async () => {
    //     try {
    //       await Marks.insertMany(sampleMarksData);
    //       console.log('Sample data inserted successfully');
    //     } catch (error) {
    //       console.error('Error inserting sample data:', error);
    //     }
    //   };
const port = process.env.PORT || 5000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await insertSampleData();
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
