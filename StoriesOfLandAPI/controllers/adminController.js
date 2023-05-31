// import Admin 
const Admin = require('../db/models/Admin');
const generatePassword = require('generate-password');

/**
 * This function handles the GET request to retrieve all admin records from the database.
 * @param {object} req 
 * @param {object} res 
 */
const getAllUserAccount = async (req, res) => {

    //call find method to return all plants
    Admin.find().
        //on success call lambda function.
        then((admins) => {

            //check each admin object's length to make sure the content is there.
            if (!admins.length) {
                //if length zero means ,no data response return as json and error message 404
                return res.status(404).json({ success: false, error: "No plants found." });
            }
            //if length is greater than zero means data is present and it displays data with status code 200.
            return res.status(200).json({ success: true, data: admins });
        }).
        //on error catch block will be executed with anonymous lambda function and returns status code 400 with error message.
        catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
};

/**
 * This function deletes an admin object on the API.
 * @param {object} req 
 * @param {object} res 
 */
const deleteUserAccount = async (req, res) => {
    Admin.findByIdAndRemove(req.params.id).then((admin) => {
        return res.status(200).json({ success: true, message: "Admin user deleted", data: admin });
    }).catch((err) => {
        return res.status(400).json({ sucess: false, error: err });
    });
};

/**
 * This function updates an admin object on the API with the specified data.
 * @param {object} req 
 * @param {object} res 
 * @returns update an admin object.
 */
const updateUserAccount = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const autoPassword = generatePassword.generate({
        length: 8, 
        numbers: true,
        uppercase: true, 
        lowercase: true, 
    });

    if (body.constructor === Object && Object.keys(body).length === 0) {
        return res.status(400).json({ success: false, error: "You must provide Admin User account information" });
    }
    Admin.findById(id).then((admin) => {
        admin.password = autoPassword;

        admin.save().then(() => {
            return res.status(200).json({
                success: true,
                id: admin['_id'],
                message: "Password updated",
                password: admin['password']
            });
        }).catch((err) => {
            return res.status(400).json({ success: false, message: "err11" });
        });
    }).catch((err) => {
        return res.status(400).json({ success: false, message: "err22" });
    });
};

/**
 *  export getAllUserAccount.
 */
module.exports = {
    getAllUserAccount,
    deleteUserAccount,
    updateUserAccount
};
