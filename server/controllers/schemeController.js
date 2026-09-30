import Scheme from '../models/Scheme.js';
import { SCHEMES_DATABASE } from '../data/schemesData.js';

export const getAllSchemes = async (req, res) => {
  try {
    let schemes = await Scheme.find().sort({ createdAt: -1 });

    // Fallback to internal dataset if MongoDB is empty
    if (!schemes || schemes.length === 0) {
      schemes = SCHEMES_DATABASE.map((s) => ({
        ...s,
        slug: s.id,
      }));
    }

    return res.status(200).json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    console.error('getAllSchemes error:', error);
    return res.status(200).json({
      success: true,
      count: SCHEMES_DATABASE.length,
      schemes: SCHEMES_DATABASE.map((s) => ({ ...s, slug: s.id })),
    });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;

    let scheme = null;
    try {
      scheme = await Scheme.findOne({
        $or: [{ slug: id.toLowerCase() }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
    } catch (e) {
      // not a mongo id
    }

    if (!scheme) {
      const memoryMatch = SCHEMES_DATABASE.find(
        (s) => s.id === id || s.id.toLowerCase() === id.toLowerCase()
      );
      if (memoryMatch) {
        scheme = { ...memoryMatch, slug: memoryMatch.id };
      }
    }

    if (!scheme) {
      return res.status(404).json({
        success: false,
        code: 'SCHEME_NOT_FOUND',
        message: 'Government scheme not found.',
      });
    }

    return res.status(200).json({
      success: true,
      scheme,
    });
  } catch (error) {
    console.error('getSchemeById error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Failed to retrieve scheme details.',
    });
  }
};

export const searchSchemes = async (req, res) => {
  try {
    const { query = '', category = '', state = '' } = req.query;
    const cleanQ = query.trim().toLowerCase();

    let allSchemes = await Scheme.find({});
    if (!allSchemes || allSchemes.length === 0) {
      allSchemes = SCHEMES_DATABASE.map((s) => ({ ...s, slug: s.id }));
    }

    const filtered = allSchemes.filter((s) => {
      const matchQ =
        !cleanQ ||
        s.title.toLowerCase().includes(cleanQ) ||
        (s.shortDescription && s.shortDescription.toLowerCase().includes(cleanQ)) ||
        (s.category && s.category.toLowerCase().includes(cleanQ)) ||
        (s.tags && s.tags.some((t) => t.toLowerCase().includes(cleanQ)));

      const matchCat =
        !category ||
        category.toLowerCase() === 'all' ||
        (s.category && s.category.toLowerCase() === category.toLowerCase());

      const matchState =
        !state ||
        state.toLowerCase() === 'all india' ||
        (s.eligibilityCriteria?.states &&
          (s.eligibilityCriteria.states.includes('All India') ||
            s.eligibilityCriteria.states.includes(state)));

      return matchQ && matchCat && matchState;
    });

    return res.status(200).json({
      success: true,
      count: filtered.length,
      schemes: filtered,
    });
  } catch (error) {
    console.error('searchSchemes error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Search failed.',
    });
  }
};

export const getSchemesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    let schemes = await Scheme.find({ category: new RegExp(`^${category}$`, 'i') });

    if (!schemes || schemes.length === 0) {
      schemes = SCHEMES_DATABASE.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      ).map((s) => ({ ...s, slug: s.id }));
    }

    return res.status(200).json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    console.error('getSchemesByCategory error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Failed to retrieve schemes for category.',
    });
  }
};
