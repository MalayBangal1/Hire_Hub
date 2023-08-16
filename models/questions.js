const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    titel:{
        type: String,
        required : true,
    },
    option1:{
        type: String,
        required : true,
    },
    option2:{
        type: String,
        required : true,
    },
    option3:{
        type: String,
        required : true,
    },
    option4:{
        type: String,
        required : true,
    },
    correctAns:{
        type: String,
        required : true,
    }
});

module.exports = mongoose.model('questions',questionsSchema);