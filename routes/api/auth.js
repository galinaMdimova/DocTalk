const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

// @route   GET api/auth
// @desc    Authenticate users & get login
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});

// @route   POST api/auth
// @desc    Authenticate users & get login
// @access  Public

router.post(
    '/',
    [
        check('email', 'Въведете валиден имейл').isEmail(),
        check('password', 'Въведете парола').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        try {
            //see if the user exists
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400)
                    .json({ errors: [{ msg: 'Данните не са коректни' }] })
            }

            console.log(user)

            //check if password matchs
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400)
                    .json({ errors: [{ msg: 'Данните не са коректни' }] })

            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                })
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server error')

        }

    }
);

module.exports = router;