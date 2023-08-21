const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username:String,    //! remember when creat user schema passport take username not (email) as key thats why changed;
    // password:String, //^ passport make it own .
    name:{
        type:String,
        default:"Student"
    },
    dob:String,
    gender:String,
    phone:String,
    isAdmin:{
        type:Boolean,
        default:false,
    },
    CGPA:{
        type:Number,
        min:0,
        max:10,
    },
    resume:{
        type : mongoose.Types.ObjectId,
        ref:"resume"
    },
    resumeLink:{
        type: String,
        default:"#"
    },
    appliedJobs: [
		{
			type: mongoose.Schema.Types.ObjectId,
            default:"Not applyed",
			ref: "job"
		}
	]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",userSchema);