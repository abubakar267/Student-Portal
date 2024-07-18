const { StatusCodes } = require('http-status-codes');
const Attendance = require('../../student/models/attendence');
const mongoose = require('mongoose');


let stdid = null;


const setAttendance = async (studentId, courseId, req, res) => { 
    try {
        const { ndate, nstatus } = req.body;
        const formattedDate = new Date(ndate).toISOString().split('T')[0]; 
        console.log('formatted',formattedDate);
        
        // Format date


        const addedAttendance = await Attendance.create({
            studentId,
            date: formattedDate,
            status: nstatus,
            courseCode: courseId
        });
        await addedAttendance.save();

        res.status(StatusCodes.OK).json({ addedAttendance });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred', error });
    }
}

const getAttendance = async (courseCode, req, res) => {
    try {
        console.log('fdfdf');
        console.log(courseCode);
        
 // Assuming you passed student ID in URL

     console.log(stdid);
        console.log('rtrt');
        const attendanceRecords = await Attendance.find({ courseCode, studentId : stdid });
        res.status(StatusCodes.OK).json(attendanceRecords);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred', error });
    }
};


const setId = async (sentId, req, res) => {
    stdid = sentId;
    console.log('hahaha',sentId);
  
    res.status(StatusCodes.OK).json(sentId);
}


const editAttendance = async (id, code, req, res) => {
    try {
        const { ndate, nstatus,odate,ostatus } = req.body;
        
        // const checkDate = new Date(ndate).toISOString();
        console.log(code,id,ndate,nstatus,ostatus,odate);

        const editedAttendance = await Attendance.findOneAndUpdate(
            {
            courseCode: code,
            studentId: id,
            date: odate,
            status: ostatus
        },

        {
            status:nstatus,
            date:ndate
        }
    );


        res.status(StatusCodes.OK).json(editedAttendance);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred', error });
    }
};



module.exports = { setAttendance, getAttendance,setId,editAttendance };
