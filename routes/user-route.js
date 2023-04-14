const express = require("express");
const userController = require('../controller/user-controller');
const authController = require("../controller/auth-controller");
const expressJwt = require('express-jwt');


const router = express.Router();

const checkAuthorized = expressJwt.expressjwt({
    secret: "nkvjefaNJVDSJ",
    userProperty: 'auth',
    algorithms: ["HS256"]
});

router.route('/api/users')
    .get(userController.list)
    .post(userController.create_user)

router.route('/api/users/:userId')
    // GET
    .get(checkAuthorized, userController.read)
    // UPDATE
    .put(checkAuthorized, authController.hasAuthorization ,userController.updateUserById)
    // DELETE
    .delete(checkAuthorized, authController.hasAuthorization, userController.deleteUser)

router.param('userId', userController.getUserById);


module.exports = router;
