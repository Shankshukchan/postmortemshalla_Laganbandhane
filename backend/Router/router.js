const express = require('express');
const router = express.Router();
const userRegisterController = require('../Controller/userRegisterController');
const uploadFile = require('../middleware/multer');
const userLoginController = require('../Controller/userLoginController');
const { updateUserProfileController } = require('../Controller/userProfileController');

router.post('/register', userRegisterController);
router.post('/login', userLoginController);

// Route: update user details (with image upload)
router.post('/update-profile', uploadFile.single('profileImage'), updateUserProfileController);

module.exports = router;