const express = require('express');
const router = express.Router();

const Notification = require('../models/notification');

//& MIDDLEWARES

const{checkLoggedIn,checkAdmin} = require('../middlewares/index');

//! CRUD dont require show so we need 6 API
//* index route
router.get('/notifications',async (req,res) =>{
    try {
        const allNotifs = await Notification.find();

        return res.render('notification/index',{allNotifs});
    } catch (error) {
        req.flash('error', 'Something went wrong while fetching a Notification, please try again later');
		console.log(error);
		return res.redirect('/jobs');
    }
});
//* new route
router.get('/notifications/new',checkLoggedIn,checkAdmin,(req,res)=>{
    return res.render('notification/new');
});
//* create route
router.post('/notifications',checkLoggedIn,checkAdmin,async (req,res) =>{
    try {
        const newNotif = new Notification({
            title:req.body.title,
            body:req.body.body,
            author:req.body.author,
        });
        await newNotif.save();
        req.flash("success", "Notification added successfully");
        return res .redirect('/notifications');
    } catch (error) {
        req.flash('error', 'Something went wrong while posting a Notification, please try again later');
		console.log(error);
		return res.redirect('/notifications');
    }
});
//* edit route
router.get('/notifications/:id/edit',checkLoggedIn,checkAdmin,async (req,res) =>{
    try {
        const foundNotif = await Notification.findById(req.params.id);
        return res.render('notification/edit',{foundNotif});
    } catch (error) {
        req.flash('error', 'Something went wrong while editing Notification, please try again later');
		console.log(error);
		res.redirect('/notifications');
    }
});
//* update route
router.patch('/notifications/:id',checkLoggedIn,checkAdmin,async (req,res) =>{
    try {
        const notifData = {
            title:req.body.title,
            body:req.body.body,
            author:req.body.author,
        };
        await Notification.findByIdAndUpdate(req.params.id,notifData);
        req.flash("success", "Notification Updated Successfully");
        return res.redirect('/notifications');
    } catch (error) {
        req.flash('error', 'Something went wrong while updating Notification, please try again later');
		console.log(error);
		return res.redirect('/notifications');
    }
});
//* delete route
router.delete('/notifications/:id',checkLoggedIn,checkAdmin,async (req,res)=>{
    try {
        await Notification.findByIdAndDelete(req.params.id);
        req.flash("success", "Notification Deleted Successfully");
        return res.redirect('/notifications');
    } catch (error) {
        req.flash('error', 'Something went wrong while Deleting Notification, please try again later');
		console.log(error);
		return res.redirect('/notifications');
    }
})

module.exports = router;