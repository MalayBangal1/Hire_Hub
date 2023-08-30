const express = require('express');
const router = express.Router();

const Job = require('../models/job');
const Questions = require('../models/questions');


//! midelwares

const{checkLoggedIn,checkAdmin} = require('../middlewares/index')

//* INDEX

router.get('/jobs/:id/questions',checkLoggedIn,checkAdmin, async(req,res) =>{
    try {
        const foundJob = await Job.findById(req.params.id).populate('questions');
        // const questions = job.questions;
        // console.log(foundJob.questions);
        // agar sirf questions cahi too
        return res.render('questions/index',{foundJob, page: 'Questions - Hire Hub'});
        // return res.send({job});
    } catch (error) {
        req.flash('error', 'Something went wrong while Finding questions, please try again later');
		console.log(error);
	    return res.redirect(`/jobs/${req.params.id}`);
    }
});

//* NEW

router.get('/jobs/:id/questions/new', checkLoggedIn,checkAdmin,(req,res) =>{
    return res.render('questions/new',{id:req.params.id,page: 'New Question - Hire Hub'}); // is page se creat wala post pe jane ke liye jobs id chahiye hogi ===>
});

//* CREAT

router.post('/jobs/:id/questions',checkLoggedIn,checkAdmin, async(req,res) =>{
    try {
        const newQuestiuon = new Questions({
            titel:req.body.title,
            option1:req.body.option1,
            option2:req.body.option2,
            option3:req.body.option3,
            option4:req.body.option4,
            correctAns:req.body.correctAns
        });
       await newQuestiuon.save();
       const job = await Job.findById(req.params.id);
       job.questions.push(newQuestiuon);
       await job.save();
       req.flash("success", "You successfully add your questions");
       return res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
        
        console.log(error);
        return res.send(error);
    }
});

//* EDIT

router.get('/jobs/:id/questions/:quesId',checkLoggedIn,checkAdmin, async(req,res) =>{
    try {
        const foundQuestion = await Questions.findById(req.params.quesId);
        return res.render('questions/edit',{foundQuestion,
            quesId:req.params.quesId,
            id:req.params.id ,page: 'Edit Question - Hire Hub'});
    } catch (error) {
        
        console.log(error);
        
    }
});

//* UPDATE

router.patch('/jobs/:id/questions/:quesId',checkLoggedIn,checkAdmin, async(req,res) =>{
    try {
        const questionData = {
            titel:req.body.title,
            option1:req.body.option1,
            option2:req.body.option2,
            option3:req.body.option3,
            option4:req.body.option4,
            correctAns:req.body.correctAns
        };
        await Questions.findByIdAndUpdate(req.params.quesId,questionData);
        req.flash("success", "You successfully updete your questions");
        return res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
        
        console.log(error);
    }
});

//* DELETE

router.delete('/jobs/:id/questions/:quesId',checkLoggedIn,checkAdmin, async(req,res) =>{
    try {
        await Questions.findByIdAndDelete(req.params.quesId);
        //! jobs ke ander question delete karna pedega kya ?
        req.flash("success", "You successfully deleted your question");
        return res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
    
        console.log(error);
    }
})

module.exports = router;