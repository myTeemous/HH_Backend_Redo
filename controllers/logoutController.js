exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            next(err);
        }
        else {
            res.clearCookie('sid');
            res.redirect('/');
        }
    })
}