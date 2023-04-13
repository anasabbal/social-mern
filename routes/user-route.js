const express = require("express");
const userController = require('../controller/user-controller');
const authController = require("../controller/auth-controller");
const expressJwt = require('express-jwt');


const router = express.Router();




router.route('/api/users')
    .get(userController.list)
    .post(userController.create_user)

router.route('/api/users/:userId')
    .get(expressJwt.expressjwt({
        secret: "nkvjefaNJVDSJ",
        userProperty: 'auth',
        algorithms: ["HS256"]
    }), userController.read)

    .put(expressJwt.expressjwt({
        secret: "nkvjefaNJVDSJ",
        userProperty: 'auth',
        algorithms: ["HS256"]
    }), authController.hasAuthorization, userController.updateUserById)
    .delete(expressJwt.expressjwt({
        secret: "nkvjefaNJVDSJ",
        userProperty: 'auth',
        algorithms: ["HS256"]
    }), authController.hasAuthorization, userController.deleteUser)

router.param('userId', userController.getUserById);


module.exports = router;
