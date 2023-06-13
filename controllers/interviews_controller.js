const Student = require('../models/student');
const Interview = require('../models/interview');
module.exports.interviewList = async (req, res) => {
    //TODO take interview list from database and pass it to view
    const interviews = await Interview.find({});
    const interviewList = [];

    for (const interview of interviews) {
    const newInterview = await Interview.findById(interview._id).populate('students', "-_id -__v -interview -createdAt -updatedAt");
    // console.log(newInterview);
    interviewList.push(newInterview);
    }

    // console.log(interviewList);
    // console.log(interviewList[0].students);

    res.render('interview_list', {
        title: 'Interviews',
        interviews: interviewList
    })
}

module.exports.create = async (req, res) => {
    const students = await Student.find({})
    res.render('create_interview', {
        title: "Interview Form",
        students: students
    })
}

module.exports.createInterview = async (req, res) => {
    let interview = await Interview.create(req.body);
    let studentsObject = {
        student: req.body.student,
        result: req.body.results
    }
    interview = await Interview.findByIdAndUpdate(
        interview._id,
        { $push: { students: studentsObject}},
        { new: true, useFindAndModify: false }
        );
    const student = await Student.findByIdAndUpdate(
        req.body.student,
        { $push: { interviews: interview.id}},
        { new: true, useFindAndModify: false }
        );
    res.redirect('/interviews');
}

module.exports.interview = async (req, res) => {
    const interview = await Interview.findById(req.params.id).populate('students.student');
    const students = await Student.find({})
    // console.log(interview);
    res.render('interview', {
        title: 'interview',
        interview: interview,
        students: students
    })
}

module.exports.addStudent = async (req, res) => {
    studentsObject = {
        student: req.body.student,
        result: req.body.results
    }
    // console.log(studentsObject);
    // console.log(req.params.id);
    const interview = await Interview.findByIdAndUpdate(
        req.params.id,
        { $push: { students: studentsObject}},
        { new: true, useFindAndModify: false }
        );
    // const interview = await Interview.findById(req.params.id);
    // console.log(interview);
    res.redirect(`/interviews/interview/${req.params.id}`);
}

