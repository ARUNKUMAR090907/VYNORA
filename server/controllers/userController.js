import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, annualIncome, houseType, gender, address, state, nativeLanguage, community, religion, occupationStatus } = req.body;

    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (annualIncome) user.annualIncome = annualIncome;
    if (houseType) user.houseType = houseType;
    if (gender) user.gender = gender;
    if (address) user.address = address;
    if (state) user.state = state;
    if (nativeLanguage) user.nativeLanguage = nativeLanguage;
    if (community) user.community = community;
    if (religion) user.religion = religion;
    if (occupationStatus) user.occupationStatus = occupationStatus;

    // Check if profile is complete
    user.checkProfileCompletion();

    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
