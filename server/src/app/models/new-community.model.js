const mongoose = require('mongoose');
 

const newCommunitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    communityName: {
        type: String,
        required: true
    },
    communityPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("NewCommunity", newCommunitySchema)