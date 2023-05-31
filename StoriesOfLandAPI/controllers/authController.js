const passport = require('passport');
const Admin = require('../db/models/Admin');
const auth = require('../auth');
const generatePassword = require('generate-password');

const register = async (req, res) => {
    const autoPassword = generatePassword.generate({
        length: 8, 
        numbers: true,
        uppercase: true, 
        lowercase: true, 
    });
    req.body.password = autoPassword;
    Admin.register(new Admin({ username: req.body.username, status: req.body.status }), autoPassword, (err, user) => {
        if (err) {
            res.status(500).json({ success: false, error: err });
        }
        passport.authenticate('local')(req, res, () => {
            res.status(200).json({ success: true, message: "Account created", password: autoPassword })
        });
    })
};

const login = async (req, res) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ success: false, error: "Invalid username or password" });
        }
        const token = auth.getToken({ _id: user._id });
        return res.status(200).json({ success: true, token: token, message: "Logged in", username: user.username, status: user.status});
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