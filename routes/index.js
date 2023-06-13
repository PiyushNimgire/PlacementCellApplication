const express = require('express');
const router = express.Router();
const csv = require('fast-csv');
const Student = require('../models/student');

router.get('/', (req, res) => {
    res.send("<h1>Home</h1>")
});


router.use('/download', require('./download'));
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interviews', require('./interviews'));

module.exports = router;