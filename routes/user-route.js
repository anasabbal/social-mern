const express = require("express");
const { 
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
} = require('../controller/user-controller');
const {register, logout, hasAuthorization} = require("../controller/auth-controller");
const expressJwt = require('express-jwt');


const router = express.Router();

const checkAuthorized = expressJwt.expressjwt({
    secret: "nkvjefaNJVDSJ",
    userProperty: 'auth',
    algorithms: ["HS256"]
});

router.route('/api/users')
    .get(list)
    .post(create_user)

// User Route
router.route('/api/users/:userId')
    // GET
    .get(checkAuthorized, read)
    // UPDATE
    .put(checkAuthorized, hasAuthorization ,updateUserById)
    // DELETE
    .delete(checkAuthorized, hasAuthorization, deleteUser)

// Posts
router.route('/api/users/follow')
    .put(checkAuthorized, addFollowing, addFollower)
router.route('/api/users/unfollow')
    .put(checkAuthorized, removeFollowing, removeFollower)

router.param('userId', getUserById);


module.exports = router;
