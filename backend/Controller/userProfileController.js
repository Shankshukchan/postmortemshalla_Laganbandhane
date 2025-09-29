const { userTable } = require('../Model/table');

// Basic user profile update controller (no image upload)
const updateUserProfileController = async (req, res) => {
    try {
        const { userId, FullName, email } = req.body;
        let updateData = { updatedAt: Date.now() };
        if (FullName) updateData.FullName = FullName;
        if (email) updateData.email = email;
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
        res.status(500).json({ success: false, message: 'Error updating user profile', err });
    }
};

module.exports = {
    updateUserProfileController
};
