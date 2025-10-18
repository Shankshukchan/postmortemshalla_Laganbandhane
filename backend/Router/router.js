const express = require("express");
const router = express.Router();
const userRegisterController = require("../Controller/userRegisterController");
const uploadFile = require("../middleware/multer");
const userLoginController = require("../Controller/userLoginController");
const { getAllUsersController } = require("../Controller/adminController");
const {
  updateUserProfileController,
  getUserProfileController,
  serveProfileImageController,
} = require("../Controller/userProfileController");
const AuthSignIn = require("../middleware/jwtAuthentication");

router.post("/register", userRegisterController);
router.post("/login", userLoginController);

// Route: update user details (with image upload)
router.post(
  "/update-profile",
  AuthSignIn,
  uploadFile.single("profileImage"),
  updateUserProfileController
);
// Route: fetch user profile by userId or email
router.get("/get-profile", getUserProfileController);

// Admin: get all users
router.get("/users", getAllUsersController);

// Serve profile image - only accessible by the owner
router.get("/profile-image/:userId", AuthSignIn, serveProfileImageController);

module.exports = router;
