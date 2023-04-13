const mongoose = require("mongoose");


const PostModel = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    text: {
        type: String,
        required: "Text is required"
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        text: String,
        created: {
            type: Date,
            default: Date.now
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = mongoose.model('Post', PostModel);

