const User = require("../model/user-model");
const {getErrorMessage} = require("../helper/error-handler");
const extend = require('lodash/extend');



const create_user = async (req, res) => {
    const user = await new User(req.body);

    try {
        await user.save();
        return res.status(201).json({
            message: "Successfully signed up !"
        });
    }catch (err){
        return res.status(400).json({
            error : getErrorMessage(err)
        });
    }
}
const read = (req, res) => {
    console.log("Request Profile");
    console.log(req.profile)
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const list = async(req, res) => {
    try {
        let users = await User.find().select('name email updated created');
        res.json(users);
    }catch (err){
        console.log(err);
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
        console.log(err);
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}
const photo = async (req, res, next) => {
    if(req.profile.phot.data){
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo.data);
    }
    next()
}
const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd());
}
const addFollowing = async (req, res, next) => {
    try{
        console.log("Request body: ", req.body);
        console.log("Follow Id: ", req.body.followId)
        await User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}}) 
        next()
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
  
const addFollower = async (req, res) => {
    try{
        console.log("Request body: ", req.body);
        console.log("Follow Id: ", req.body.followId)
        let result = await User.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
                              .populate('following', '_id name')
                              .populate('followers', '_id name')
                              .exec();
        console.log("Resutlt: ", result);
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
      }catch(err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }  
}
const removeFollowing = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(
            req.body.userId, {
                $pull: {following: req.body.unfollowId}
            }
        )
        next()
    }catch(err){
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}
const removeFollower = async(req, res) => {
    try{
        let result = await User.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
                            .populate('following', '_id name')
                            .populate('followers', '_id name')
                            .exec();
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
    }catch(err){
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}


module.exports = {
    addFollower,
    removeFollowing,
    addFollowing,
    create_user,
    getUserById,
    list,
    updateUserById,
    deleteUser,
    read,
    defaultPhoto,
    photo,
    removeFollower
};
