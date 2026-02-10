/**
 * Assign API
 * POST /api/tickets/[id]/assign - Assign users to ticket
 */

const { getKit } = require('../../_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const kit = await getKit();
    const { id } = req.query;

    if (req.method === 'POST') {
      await kit.assignTicket(id, req.body.assignees);
      const ticket = await kit.getTicket(id);
      return res.status(200).json(ticket);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Assign API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
