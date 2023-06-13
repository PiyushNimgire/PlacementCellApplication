const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    company_name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
          required: true
        },
        result: {
          type: String,
          enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
          default: 'On Hold'
        }
      }
    ]
  });

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;