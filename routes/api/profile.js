const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const { check, validationResult } = require('express-validator')

// @route   GET api/profile/me
// @desc    Get current users profile 
// @access  Private

router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('User', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'Този потребител няма профил' })
        }

        res.json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST api/profile
// @desc    Create or update user profile 
// @access  Private

router.post('/',
    [auth,
        [
            check('status', 'Статусът е задължителен').not().isEmpty(),
            check('skills', 'Специалността/Компетенцията е задължителна').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            skills,
            youtube,
            facebook
        } = req.body

        //Build profile object

        const profileFields = {}
        profileFields.user = req.user.id
        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim())
        }

        //Build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (facebook) profileFields.social.facebook = facebook

        try { 
        //Find the existed profile
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
               
                //Update profile 
                profile = await Profile.findOneAndUpdate( 
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true })   

                return res.json(profile) 
            }

            //Create profile
            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    })

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res)=> {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles) 

    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')  
    } 
})  

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user_id
// @access  Public

router.get('/user/:user_id', async (req, res)=> {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        console.log(profile) 
        if(!profile)  
        return res.status(400).json({msg: 'Не е открит профил'})
        res.json(profile)   

    } catch(err) {
        console.error(err.message)
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg: 'Не е открит профил'})
        }
        res.status(500).send('Server error')   
    }  
})  

// @route   DELETE api/profile
// @desc    delete profile, user and posts
// @access  Private

router.delete('/', auth, async (req, res)=> {
    try {
        //Remove users posts
        await Post.deleteMany({ user: req.user.id})

        //Remove profile
       await Profile.findOneAndRemove({user: req.user.id})
       //Remove User
       await User.findOneAndRemove({_id: req.user.id})
        res.json({msg: 'Потребителят е премахнат'}) 

    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')  
    } 
})  


// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth, [ 
    check('title', 'Липсва информация за настоящо работно място').not().isEmpty(),
    check('company', 'Липсва информация за работодател').not().isEmpty(),
    check('from', 'Липсва информация за дата на започване').not().isEmpty(),
    
]], async (req, res)=> {
const errors = validationResult(req) 
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}
const {
    title,
    company,
    location,
    from,
    to,
    current,
    description

} = req.body
  
const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
}

try {
    const profile = await Profile.findOne({user: req.user.id})
    profile.experience.unshift(newExp)
    await profile.save()
    res.json(profile)
    
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')  
}

})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Add profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id})
        //Get remove index
        const removeIndex = profile.experience
        .map(item => item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')  
    }

})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth, [ 
    check('school', 'Липсва информация за учебно заведение').not().isEmpty(),
    check('degree', 'Липсва информация за придобита степен').not().isEmpty(),
    check('fieldofstudy', 'Липсва информация за специалност').not().isEmpty(),
    check('from', 'Липсва информация за дата на започване').not().isEmpty(),
    
]], async (req, res)=> {
const errors = validationResult(req) 
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}
const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description

} = req.body
  
const newEdu = { 
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
}

try {
    const profile = await Profile.findOne({user: req.user.id})
    profile.education.unshift(newEdu)
    await profile.save()
    res.json(profile) 
    
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')  
}

})

// @route   DELETE api/profile/education/:edu_id
// @desc    Add profile education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id})
        //Get remove index
        const removeIndex = profile.education
        .map(item => item.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')  
    }

})

module.exports = router 
