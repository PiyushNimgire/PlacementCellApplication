const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['placed', 'not_placed'],
      required: true
    },
    courseScores: {
      dsaFinalScore: {
        type: Number,
        required: true
      },
      webDFinalScore: {
        type: Number,
        required: true
      },
      reactFinalScore: {
        type: Number,
        required: true
      }
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
        required: true
      }
    ]
  });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
