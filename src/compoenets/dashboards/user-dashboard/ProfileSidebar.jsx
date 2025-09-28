
const ProfileSidebar = ({ profile, profileImage, handleChange, handleSubmit }) => (
  <div className="md:col-span-1 bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-3xl font-bold text-gray-500 overflow-hidden">
      {profileImage ? (
        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <span>{profile.name ? profile.name[0] : "U"}</span>
      )}
    </div>
    <h2 className="text-xl font-semibold mb-2">{profile.name || "User Name"}</h2>
    <p className="text-gray-500 mb-4">{profile.email || "user@email.com"}</p>
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block text-sm font-medium">Profile Image</label>
        <input type="file" name="profileImage" accept="image/*" onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Name</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1" required />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Email</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1" required />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Birthdate</label>
        <input type="date" name="birthdate" value={profile.birthdate} onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1" required />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Caste</label>
        <input type="text" name="caste" value={profile.caste} onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Religion</label>
        <input type="text" name="religion" value={profile.religion} onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Age</label>
        <input type="number" name="age" value={profile.age} onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1" min="0" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Marriage Status</label>
        <select name="marriageStatus" value={profile.marriageStatus} onChange={handleChange} className="mt-1 w-full border rounded px-2 py-1">
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Update Profile</button>
    </form>
  </div>
);

export default ProfileSidebar;
