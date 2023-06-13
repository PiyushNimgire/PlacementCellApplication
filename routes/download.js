const express = require('express');
const router = express.Router();
const csv = require('fast-csv');
const Student = require('../models/student');

router.get('/', async (req, res) => {
  try {
    const students = await Student.find({}).populate('interviews').lean();

    const transformedData = students.flatMap((student) => {
      const { _id, __v, courseScores, interviews, ...rest } = student;

      // Extract interview details into separate rows
      const interviewDetails = interviews.map((interview) => {
        const { _id, __v, students, ...interviewData } = interview;
        const { result } = students[0];

        return { ...rest, ...interviewData, result };
      });

      return interviewDetails;
    });

    const headers = Object.keys(transformedData[0]).filter((header) => header !== 'courseScores');

    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');

    csv.writeToStream(res, transformedData, { headers, includeEndRowDelimiter: true })
      .on('finish', () => {
        res.end();
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
