const passport = require('passport');
const Admin = require('../db/models/Admin');
const auth = require('../auth');

const register = async (req, res) => {
    Admin.register(new Admin({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            res.status(500).json({ success: false, error: err });
        }
        passport.authenticate('local')(req, res, () => {
            res.status(200).json({ success: true, message: "Account created" })
        });
    })
};

const login = async (req, res) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ success: false, error: "Invalid username or password" });
        }
        const token = auth.getToken({ _id: user._id });
        return res.status(200).json({ success: true, token: token, message: "Logged in" });
    })(req, res);
};

const logout = async (req, res) => {
    res.setHeader('Authorization', '');
    res.status(200).json({ message: 'logged out' });
};

module.exports = {
    register,
    login,
    logout
};