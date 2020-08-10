const express = require('express');
const router = express.Router();

// @route   GET api/auth/test
// @desc    Tests users route
// @access  Public
router.get('/', (req, res) => res.json({ msg: 'Auth Works' }));

module.exports = router;