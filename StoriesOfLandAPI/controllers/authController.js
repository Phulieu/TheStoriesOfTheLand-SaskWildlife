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
    const token = auth.getToken({ _id: req.user._id });
    res.status(200).json({ success: true, token: token, message: "logged in" });
};

const logout = async (req, res) => {

    const token = auth.getToken({ _id: req.user._id });

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        return res.status(200).json({ message: 'Logout successful' });
    });
};

module.exports = {
    register,
    login,
    logout
};