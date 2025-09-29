const express = require('express');
const router = express.Router();
const userRegisterController = require('../Controller/userRegisterController');
const userLoginController = require('../Controller/userLoginController');
const { uploadProfileImageController, updateUserProfileController } = require('../Controller/userProfileController');
const uploadFile = require('../middleware/multer');

router.post('/register', userRegisterController);
router.post('/login', userLoginController);

// New route: update user details and profile image together
router.post('/update-profile', uploadFile.single('profileImage'), updateUserProfileController);
router.post('/upload-profile-image', uploadFile.single('profileImage'), uploadProfileImageController);

module.exports = router;