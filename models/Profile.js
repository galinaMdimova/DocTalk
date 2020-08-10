const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'users' 
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    experiance: [
        {
            title: {
                type: String,
                require: true
            },
            company: {
                type: String,
                require: true
            },
            location: {
                type: String,
                require: true
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                require: true
            },
            degree: {
                type: String,
                require: true
            },
            fieldofstudy: {
                type: String,
                require: true
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
            }

        }
    ],
    social:{
        youtube: {
            type: String,
        },
        facebook: {
            type: String,
        }
    },
     date:{
         type: Date,
         default: Date.now
     }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)