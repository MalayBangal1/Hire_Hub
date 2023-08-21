const mongoose = require('mongoose');
const notifSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
    },
    body : String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author : String,
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'job'
    }
});
module.exports = mongoose.model('notification',notifSchema);