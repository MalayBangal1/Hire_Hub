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
        // enum: [ 'SDE', 'analyst', 'ui', 'hr', 'manager' ]
    },
    companyName : {
        type: String,
        required: [ true, 'You must enter the name of post' ],
		default: 'SDE',
		
    },
    CTC :{
        type: String,
        required: true,
        default: "not mention",
    },
    CGPA : {
        type: Number,
		required: true,
		min: 0,
		max: [ 10, 'Maximum allowed value for cgpa is 10' ]
    },
    status: {
		type: String,
		enum: [ 'active', 'over', 'interview' ],
		default: 'active'
	},
    appliedUsers :
            [
				{
					id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'user'
					},
					shortlisted: {
						type: Boolean,
						default: false
					},
					rejected: {
						type: Boolean,
						default: false
					},
					name: String
				}
			],
       
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'questions'
        }
    ],
    numberOfPositions: {
        type: String
    },
    createdAt: {
		type: Date,
		default: Date.now()
	},

	logo: {
		type: String,
		default: 'krishna'
	},

	eligibility: {
		type: String,
		default: 'not given'
	},

	description: {
		type: String,
		default: 'not given'
	},

	responsibilities: {
		type: String,
		default: 'not given'
	},

	requirements: {
		type: String,
		default: 'not given'
	},

	location: {
		type: String,
		default: 'unknown'
	},

	time: {
		type: String,
		default: 'Full-Time'
	},

	deadline: {
		type: Date
	},
	experience: {
		type: String,
		default: 'Entry Level'
	}
});

// const Jobsmodel = mongoose.model("job",jobschema);
// module.exports = Jobsmodel;

jobSchema.plugin(mongoosePaginate);

//todo 3,4 in one stape( make model and expoprt  )

module.exports = mongoose.model("job",jobSchema);