const { userTable } = require('../Model/table');


// User profile update controller with image upload
const updateUserProfileController = async (req, res) => {
    try {
        const { email, FullName, birthdate, caste, religion, age, marriageStatus } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        let updateData = { updatedAt: Date.now() };
        if (FullName) updateData.FullName = FullName;
        if (birthdate) updateData.birthdate = birthdate;
        if (caste) updateData.caste = caste;
        if (religion) updateData.religion = religion;
        if (age) updateData.age = age;
        if (marriageStatus) updateData.marriageStatus = marriageStatus;
        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }
        const user = await userTable.findOneAndUpdate(
            { email },
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
