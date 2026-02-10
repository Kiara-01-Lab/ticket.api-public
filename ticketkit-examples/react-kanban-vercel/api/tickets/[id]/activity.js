/**
 * Activity API
 * GET /api/tickets/[id]/activity - Get ticket activity log
 */

const { getKit } = require('../../_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const kit = await getKit();
    const { id } = req.query;

    if (req.method === 'GET') {
      const activity = await kit.getActivity(id);
      return res.status(200).json(activity);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Activity API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
