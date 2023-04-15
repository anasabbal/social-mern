const Post = require("../model/post-model");
const formidable = require('formidable');
const fs = require('fs');
const {getErrorMessage} = require("../helper/error-handler");



const postController = {};


// Create Post
postController.create = async (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if(err)
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        let post = await new Post(fields);
        post.postedBy = req.profile;
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        try {
            let result = await post.save();
            res.json(result);
        }catch (error){
            return res.status(400).json({
                error: getErrorMessage(error)
            });
        }
    })
}

// Get By Id
postController.postById = async (req, res, next, id) => {
    try{
        let post = await Post.findById(id).populate('postedBy', '_id name').exec();
        if(!post){
            return res.status(400).json({
                error: "Post Not Found"
            });
        }
        req.post = post;
        next()
    }catch(err){
        return res.status(400).json({
            eroor: "Cound not retrieve use post"
        });
    }
}

// List By User
postController.listByUser = async (req, res) => {
    try{
        let posts = await Post.find({postedBy: req.profile._id})
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec();
        res.json(posts);
    }catch(err){
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}

// List
postController.listNewsFeed = async (req, res) => {
    let following = req.profile.following;
    following.push(req.req.profile._id);
    try{
        let posts = await Post.find({postedBy: { $in : req.profile.following } })
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .sort('-created')
                          .exec()
        res.json(posts);
    }catch(err){
        return res.status(400).json({
            erro: getErrorMessage(err)
        });
    }
}
// Reome
postController.remove = async (req, res) => {
    let post = req.post;
    try{
        let deletedPost = await post.remove();
        res.json(deletedPost);
    }catch(err){
        return res.status(400).json({
            error: getErrorMessage(err)
        });
    }
}

// Photo
postController.photo = async (req, res, next) => {
    res.set("Content-Type", req.body.photo.contentType);
    return res.send(req.post.photo.data);
}



module.exports = postController;