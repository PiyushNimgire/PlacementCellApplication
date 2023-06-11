const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>Home</h1>")
})
router.use('/users', require('./users'));

module.exports = router;