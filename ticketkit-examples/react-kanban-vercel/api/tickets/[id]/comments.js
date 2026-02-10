/**
 * Comments API
 * GET /api/tickets/[id]/comments - Get all comments
 * POST /api/tickets/[id]/comments - Add comment
 */

const { getKit } = require('../../_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const kit = await getKit();
    const { id } = req.query;

    if (req.method === 'GET') {
      const comments = await kit.listComments(id);
      return res.status(200).json(comments);
    }

    if (req.method === 'POST') {
      const comment = await kit.addComment(
        id,
        req.body.content,
        req.body.author || 'Anonymous'
      );
      return res.status(201).json(comment);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Comments API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
