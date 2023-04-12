const User = require("../model/user-model");
const jwt = require('jsonwebtoken');
const {expressJwt} = require('express-jwt');

function generateJwtToken(user) {
    const token = jwt.sign(
        {
            id: user._id,
        },
        "nkvjefaNJVDSJ",
        { expiresIn: '1h' }
    );
    return token;
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({
            "email": req.body.email
        });
        if(!user)
            return res.status(401).json({
                error: "User Not Found"
            });
        const isMatch = user.authenticate(req.body.password);

        if(!isMatch){
            return res.status('401').send({
                error: "Email and password don't match."
            });
        }
        const token = generateJwtToken(user);
        res.cookie("t", token, {
            expire: new Date() + 9999
        })
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    }catch (error){
        return res.status(401).json({
            error: "Could not sign in"
        })
    }
}
const logout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
        message: "Logout"
    });
}
const requireSignin = () => {
    expressJwt({
        secret: "nkvjefaNJVDSJ",
        userProperty: 'auth'
    });
}

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
}


module.exports = {
    register, logout, requireSignin, hasAuthorization
};
