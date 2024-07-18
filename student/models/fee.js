const mongoose = require('mongoose');

// Define the FeeChallan schema
const feeChallanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Paid', 'Unpaid'],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
});

const FeeChallan = mongoose.model('FeeChallan', feeChallanSchema);

module.exports = FeeChallan;
