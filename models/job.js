//* 1 require mongoose
//* 2 creat schema (structer of table)
//* 3 creat model (instence of schema)
//* 4 export model (model's variable)


//todo 1 require

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

//todo 2 schema

const jobSchema = new mongoose.Schema({
    postName : {
        type: String,
        required: true,
        enum: [ 'SDE', 'analyst', 'ui', 'hr', 'manager' ]
    },
    companyName : {
        type: String,
        required: [ true, 'You must enter the name of post' ],
		default: 'SDE',
		
    },
    CTC :{
        type: Number,
        required: true,
        // default: "not mention",
    },
    CGPA : {
        type: Number,
		required: true,
		min: 0,
		max: [ 10, 'Maximum allowed value for cgpa is 10' ]
    },
    location : String,
    status: {
		type: String,
		enum: [ 'active', 'over', 'interview' ],
		default: 'active'
	},
    appliedUsers :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ],
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'questions'
        }
    ],
    description : String,
    numberOfPositions: Number,
});

// const Jobsmodel = mongoose.model("job",jobschema);
// module.exports = Jobsmodel;

jobSchema.plugin(mongoosePaginate);

//todo 3,4 in one stape( make model and expoprt  )

module.exports = mongoose.model("job",jobSchema);