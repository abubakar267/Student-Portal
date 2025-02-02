const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name'],
        maxlength:50,
        minlength:3
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'],
      unique:[true,'This email is already registered']

    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    }
})


studentSchema.methods.createJWT = function (){
    return jwt.sign(
        {
            
            name:this.name,
            email:this.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    )
}


studentSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
};


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;