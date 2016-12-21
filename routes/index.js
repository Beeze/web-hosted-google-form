var express = require('express');
var passport = require('passport');
var router = express.Router();

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign In' });
});

router.get('/accident-form', ensureAuthenticated, function(req, res) {
  res.render('form', {user: JSON.stringify(req.user)});
});

// GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in LinkedIn authentication will involve
//   redirecting the user to linkedin.com.  After authorization, LinkedIn will
//   redirect the user back to this application at /auth/linkedin/callback
router.get('/auth/linkedin',
    passport.authenticate('linkedin'),
    function(req, res){
      // The request will be redirected to LinkedIn for authentication, so this
      // function will not be called.
    });

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/accident-form');
    });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
