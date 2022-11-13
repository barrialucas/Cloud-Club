module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/api/login")
    }
    if (req.user.username === process.env.ADMIN_USER) req.isAdmin = true;
    next()
    
}