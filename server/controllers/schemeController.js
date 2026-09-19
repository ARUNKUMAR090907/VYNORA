import Scheme from '../models/Scheme.js';

export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json({ success: true, schemes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.status(200).json({ success: true, scheme });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchSchemes = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const schemes = await Scheme.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, schemes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchemesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const schemes = await Scheme.find({ category });
    res.status(200).json({ success: true, schemes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
