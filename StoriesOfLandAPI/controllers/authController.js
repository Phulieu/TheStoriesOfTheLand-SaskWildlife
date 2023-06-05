const passport = require('passport');
const Admin = require('../db/models/Admin');
const auth = require('../auth');
const generatePassword = require('generate-password');
const nodemailer = require('nodemailer');

/**
 * This function used to send an email.
 * @param {object} to 
 * @param {object} subject 
 * @param {object} text
 */
const sendEmail = async (to, subject, text) => {

    // create email transport object
    const transporter = nodemailer.createTransport({
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

/**
 * This function used to create a new admin user.
 * @param {object} req 
 * @param {object} res 
 */
const register = async (req, res) => {
    // generate password automatically
    const autoPassword = generatePassword.generate({
        length: 8, 
        numbers: true,
        uppercase: true, 
        lowercase: true, 
    });
    req.body.password = autoPassword;

    // create an admin object
    Admin.register(new Admin({ username: req.body.username, status: req.body.status }), autoPassword, async (err, user) => {
        // if error occured during creation
        if (err) {
            res.status(500).json({ success: false, error: err });
        }
        // create object success
        try {
            // send the password to user email address
            await sendEmail(req.body.username, 'Your Account Password', `Your password is: ${autoPassword}`);
            // authenticate the registered user
            passport.authenticate('local')(req, res, () => {
                res.status(200).json({ success: true, message: "Account created" })
            });
        }catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'Failed to send email' });
        }
    })
};

/**
 * This function used to handle login.
 * @param {object} req 
 * @param {object} res 
 */
const login = async (req, res) => {
    // authenticate the user
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ success: false, error: "Invalid username or password" });
        }
        const token = auth.getToken({ _id: user._id });
        return res.status(200).json({ success: true, token: token, message: "Logged in", username: user.username, status: user.status});
    })(req, res);
};

/**
 * This function used to handle logout.
 * @param {object} req 
 * @param {object} res 
 */
const logout = async (req, res) => {
    res.setHeader('Authorization', '');
    res.status(200).json({ message: 'logged out' });
};

module.exports = {
    register,
    login,
    logout
};