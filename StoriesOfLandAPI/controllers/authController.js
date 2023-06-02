const passport = require('passport');
const Admin = require('../db/models/Admin');
const auth = require('../auth');
const generatePassword = require('generate-password');
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    let testAccount = await nodemailer.createTestAccount();
    // create email transport object
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        secure: true,
        port: 465,
        auth: {
            user: 'storiesoftheland@zohomail.com', // generated ethereal user
            pass: 'Group1PROJ', // generated ethereal password
        },
    });
  
    // define email option
    const mailOptions = {
        from: 'storiesoftheland@zohomail.com',
        to: to,
        subject: subject,
        text: text
    };
  
    try {
        // send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
  };

const register = async (req, res) => {
    const autoPassword = generatePassword.generate({
        length: 8, 
        numbers: true,
        uppercase: true, 
        lowercase: true, 
    });
    req.body.password = autoPassword;
    Admin.register(new Admin({ username: req.body.username, status: req.body.status }), autoPassword, async (err, user) => {
        if (err) {
            res.status(500).json({ success: false, error: err });
        }
        try {
            await sendEmail(req.body.username, 'Your Account Password', `Your password is: ${autoPassword}`);
            passport.authenticate('local')(req, res, () => {
                res.status(200).json({ success: true, message: "Account created", password: autoPassword })
            });
        }catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'Failed to send email' });
        }
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