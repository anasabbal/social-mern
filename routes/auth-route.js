const express =  require('express');
const authCtrl =  require('../controller/auth-controller');

const router = express.Router()



router.route('/api/auth/login')
    .post(authCtrl.register);

router.route('/api/auth/logout')
    .get(authCtrl.logout);

module.exports = router;
