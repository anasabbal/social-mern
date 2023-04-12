const express = require("express");
const userMiddleware = require("../middleware/user-middleware");
const userController = require('../controller/user-controller');
const authController = require("../controller/auth-controller");

const router = express.Router();


router.route('/api/users')
    .get(userController.list)
    .post(userController.create_user)

router.route('/api/users/:userId')
    .get(authController.requireSignin, userController.read)
    .put(authController.requireSignin, authController.hasAuthorization, userController.updateUserById)
    .delete(authController.requireSignin, authController.hasAuthorization, userController.deleteUser)

router.param('userId', userController.getUserById);


module.exports = router;
