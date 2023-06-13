const Student  = require('../models/student');

module.exports.studentsList = async (req, res) => {
    const students = await Student.find({});
    // console.log(students);
    res.render('student_list', {
        title: "Students",
        students: students
    })
}

module.exports.create = (req, res) => {
    res.render('create_student', {
        title: "Create Student"
    })
}

module.exports.createStudent = async (req, res) => {
    const finalObject = {
        name: req.body.name,
        batch: req.body.batch,
        college: req.body.college,
        status: req.body.status,
        courseScores: {
            dsaFinalScore: req.body.dsaFinalScore,
            webDFinalScore: req.body.webDFinalScore,
            reactFinalScore: req.body.reactFinalScore,
        }
    }
    const user = await Student.create(finalObject);
    if(!user){
        res.redirect('/students/create');
    }
    res.redirect('/students');
}