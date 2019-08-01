const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    handle: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    location: {
        type: String
    },
    website: {
        type: String
    },
    status: {
        type: String
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String
    },
    github: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            field: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    social: 
        {
            youtube: {
                type: String
            },
            facebook: {
                type: String
            },
            twitter: {
                type: String
            },
            linkedin: {
                type: String
            },
            instagram: {
                type: String
            }
        }
    ,
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
