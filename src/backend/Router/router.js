const express = require('express');
const router = express.Router();
const { userRegisterController,userLoginController } = require('../Controller/userController');
router.post('/register',userRegisterController);
router.post('/login',userLoginController);
module.exports = router;