const express = require('express');
const router = express.Router();
const passport = require('passport');
const studentsController = require('../controllers/students_controller');

router.get('/', passport.checkAuthentication, studentsController.studentsList);
router.get('/create', passport.checkAuthentication, studentsController.create);
router.post('/create-student',passport.checkAuthentication, studentsController.createStudent);

module.exports = router;