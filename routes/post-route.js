const express =  require('express');
const postController = require('../controller/post-controller');

const router = express.Router()




router.post('/api/post', postController.create);


module.exports = router;