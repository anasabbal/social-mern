const User = require("../model/user-model");
const {getErrorMessage} = require("../helper/error-handler");
const {extend} = require('lodash/extend');


const create_user = async (req, res) => {
    const user = await new User(req.body);

    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up !"
        });
    }catch (err){
        return res.status(400).json({
            error : getErrorMessage(err)
        });
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const list = async(req, res) => {
    try {
        let users = await User.find().select('name email updated created');
        res.json(users);
    }catch (err){
        return res.status(400).json({
            error : getErrorMessage(err)
        });
    }
}
const getUserById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if(!user)
            return res.status(400).json({
                error : "User Not Found"
            });
        req.profile = user;
        next();
    }catch (err){
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}
const updateUserById = async (req, res) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    }catch (err){
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    }catch (err){
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}


module.exports = {
    create_user,
    getUserById,
    list,
    updateUserById,
    deleteUser,
    read
};
