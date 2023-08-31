const  express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/login',(req,res)=>{
    return res.render('user/login',{page: 'Login - Hire Hub'});
});
router.post('/login',passport.authenticate('local',{
    failureRedirect: '/login',
    failureFlash: true
}),(req,res)=>{
    req.flash('success', `Welcome back ${req.user?.name}`);
	// console.log(req.user);
		return res.redirect('/jobs');
});
router.get('/signup',(req,res)=>{
    return res.render('user/signup',{page: 'Signup - Hire Hub'});
});
router.post('/signup',async (req,res)=>{
    try {
		const newUser = new User({
			username: req.body.username,
             //raw password , we will not provide here ,we have to hash and salt password 1st.
			CGPA: req.body.CGPA,
			gender: req.body.gender,
			phone: req.body.phone,
			dob: req.body.dob,
			name: req.body.name
		});
		let registeredUser = await User.register(newUser, req.body.password);
		// registeredUser.isAdmin = false;
		req.login(registeredUser, function(error) {
			if (error) {
				req.flash('error', 'Something went wrong while signing you up, please try again later');
				console.log(error);
				return res.redirect('/home');
			}
			req.flash('success', 'You Register Successfully');
			return res.redirect('/home');
		});
	} catch (error) {
		req.flash('error', `${error}`);
		console.log(error);
		return res.redirect('/home');
	}
});

//     const newUser = new User({
//         username: req.body.username,
//         //raw password , we will not provide here ,we have to hash and salt password 1st.
//         CGPA: req.body.CGPA,
//         phone: req.body.phone,
//         dob: req.body.dob,
//         gender: req.body.gender
//     });
//     let registeredUser = await User.register(newUser,req.body.password);
//     req.login(registeredUser,function(error){
//         if(error) { req.flash('error', 'Something went wrong while signing you up, please try again later');
//         console.log(error);
//         res.redirect('/jobs');
//     }
//         req.flash('success', 'Registration successful');
//         res.redirect('/jobs');
//     });
// });
router.get('/logout',(req,res)=>{
    req.logout(function(error){
        if (error) {
			req.flash('error', 'Something went wrong while logging you out, please try again later');
			console.log(error);
			return res.redirect('/home');
		}
		req.flash('success', 'Successfully logged out');
		return res.redirect('/home');
    });
});
module.exports = router;