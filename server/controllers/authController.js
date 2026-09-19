import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

export const register = async (req, res) => {
  try {
    const { email, username, password, confirmPassword, name } = req.body;

    if (!email || !username || !password || !confirmPassword || !name) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: email === user.email ? 'Email already exists' : 'Username already exists' });
    }

    user = await User.create({
      email,
      username,
      password,
      name,
      nativeLanguage: 'English',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Please provide username/email and password' });
    }

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        profileCompleted: user.profileCompleted,
        nativeLanguage: user.nativeLanguage,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
