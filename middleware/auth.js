function authMiddleware(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
    } else {
        res.redirect('/webhook-admin/login');
    }
}

module.exports = authMiddleware;
