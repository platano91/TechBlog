const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If logged in, proceed with the next middleware/route handler
      next();
    }
  };
  
  module.exports = withAuth;
  