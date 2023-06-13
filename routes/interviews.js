const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewController = require('../controllers/interviews_controller');

router.get('/',passport.checkAuthentication, interviewController.interviewList);
router.get('/create', passport.checkAuthentication, interviewController.create);
router.post('/create-interview', passport.checkAuthentication, interviewController.createInterview);
router.get('/interview/:id', passport.checkAuthentication, interviewController.interview);
router.post('/interview/:id/add-student', passport.checkAuthentication, interviewController.addStudent);
module.exports = router;