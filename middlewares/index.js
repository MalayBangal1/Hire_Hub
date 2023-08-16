//& MIDDLEWARES
const checkLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()) next();
    else return res.redirect('/login');
};

const checkAdmin = (req,res,next) =>{
    if(req.user.isAdmin) next();
    else {
        req.flash('error','You are not permitted to do that task');
        return res.redirect('/jobs');
    }
};
const verifyUser = (req, res, next) => {
	if (req.user.isAdmin || req.user._id.equals(req.params.id)) next();
	else {
		req.flash('error','You are not permitted to do that task');
		return res.redirect('back');
	}
};
module.exports = {
    checkLoggedIn,
    checkAdmin,
    verifyUser
};

// module.exports=checkLoggedIn = (req,res,next) =>{
//     if(req.isAuthenticated()) next();
//     else res.redirect('/login');
// };

// module.exports=checkAdmin = (req,res,next) =>{
//     if(req.user.isAdmin) next();
//     else return res.send('not permited');
// };