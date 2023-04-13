const Post = require("../model/post-model");
const formidable = require('formidable');
const fs = require('fs');
const {getErrorMessage} = require("../helper/error-handler");



const postController = {};

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


module.exports = postController;