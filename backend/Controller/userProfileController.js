const { userTable } = require('../Model/table');

// Profile image upload controller
const uploadProfileImageController = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const imagePath = `/uploads/${req.file.filename}`;
        const user = await userTable.findByIdAndUpdate(
            userId,
            { profileImage: imagePath, updatedAt: Date.now() },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Profile image updated', data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error uploading profile image', err });
    }
};

// Update user profile (details and image)
const updateUserProfileController = async (req, res) => {
    try {
        const { userId, FullName, email } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        let updateData = { updatedAt: Date.now() };
        if (FullName) updateData.FullName = FullName;
        if (email) updateData.email = email;
        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }
        // Debug log for troubleshooting
        console.log('Updating user:', userId, 'with data:', updateData, 'file:', req.file);
        const user = await userTable.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User profile updated', data: user });
    } catch (err) {
        console.error('Error in updateUserProfileController:', err);
        res.status(500).json({ success: false, message: 'Error updating user profile', error: err.message, stack: err.stack });
    }
};

module.exports = {
    uploadProfileImageController,
    updateUserProfileController
};
